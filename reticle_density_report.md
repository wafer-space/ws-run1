# Wafer.Space Run 1 — Standard Cell & SRAM Density Report

**GF180MCU Process (GlobalFoundries 180nm), Shuttle G801**

## Introduction

This report analyzes the standard cell and SRAM density achieved by the 24 unique chip designs on the [wafer.space](https://wafer.space/) Run 1 reticle. The reticle is 30mm x 24mm and contains 37 slot placements (some designs appear more than once for redundancy).

All designs were fabricated on GlobalFoundries' GF180MCU process, a 180-nanometer (0.18um) technology node. This is a mature, relatively large-geometry process — for comparison, modern smartphone chips use 3nm or 5nm processes with features roughly 50x smaller.

> **Note on counting methodology:** All standard cell counts in this report count only **logic cells** — cells that perform actual computation (gates, flip-flops, buffers, multiplexers, etc.). Infrastructure cells are excluded: filler cells (fill, fillcap, endcap, filltie), well taps, antenna fix diodes, ESD diodes, and tie-high/tie-low cells. These infrastructure cells are inserted by automated tools to satisfy manufacturing rules but perform no logic function. On this reticle, infrastructure cells outnumber logic cells nearly 3:1 — 5.6M infrastructure vs 2.1M logic instances.[^44]

## What Are Standard Cells?

A "standard cell" is a pre-designed, pre-verified building block used to construct digital circuits. Think of them like LEGO bricks for chip design: each cell performs one simple logic function (an AND gate, a flip-flop for storing one bit, a buffer for boosting signal strength), and a chip designer assembles thousands or millions of them to build complex circuits.

Standard cells in a library all share the same height (so they line up in rows) but vary in width depending on their function. A simple inverter might be 3um wide, while a flip-flop (which stores data) might be 17um wide. Automated tools place these cells in rows and then route wires between them.

The "density" of standard cells — how many fit per square millimeter — is a key measure of how efficiently a design uses its silicon area. Higher density generally means more logic functionality packed into less chip area, which reduces cost.

## Standard Cell Libraries on This Reticle

The GF180MCU process provides three standard cell libraries used on this reticle, differing in track count (row height) and voltage:

| Library | Voltage | Row Height | Rows per mm | Relative Density |
|---|---|---|---|---|
| mcu7t5v0 (7-track, 5V) | 5V tolerant | 4.78 um | 209 rows | 100% (base) |
| mcu7t3v3 (7-track, 3.3V) | 3.3V only | 4.78 um | 209 rows | 100% |
| mcu9t5v0 (9-track, 5V) | 5V tolerant | 5.94 um | 168 rows | 80% |

The two 7-track libraries (5V and 3.3V) share the same 4.78um row height, so they pack identically in terms of rows per millimeter. The 3.3V library (`mcu7t3v3`) targets designs that don't need 5V-tolerant I/O, and its cells are slightly more compact — for example, a 3.3V nand2_2 is 4.78um wide vs 5.90um for the 5V equivalent (19% narrower).[^1]

The 9-track library (`mcu9t5v0`) has 24% taller rows, reducing density but providing more space for internal wiring, which helps automated routing tools complete complex designs without congestion.

Across the reticle, the libraries are used in these proportions:[^2]
- **mcu7t5v0** (7-track 5V): 1,987k logic instances (77% of all logic cells)
- **mcu9t5v0** (9-track 5V): 545k logic instances (21%)
- **mcu7t3v3** (7-track 3.3V): 35k logic instances (1%)

Most designs use one library exclusively. Exceptions include [Tiny Tapeout](https://tinytapeout.com) ([TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2)/[TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2)), where each of the 52 sub-projects independently chose their library, and [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) and [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc), which mix libraries.[^2]

## Theoretical Maximum Standard Cell Density

If you filled an entire square millimeter with nothing but one type of logic standard cell (no wiring, no gaps, no infrastructure cells), the theoretical maximum density would be:

| Cell Type | 7-track 5V | 7-track 3.3V | 9-track 5V | What it does |
|---|---|---|---|---|
| Inverter (inv\_1) | 67k/mm² (3.10um) | — | 54k/mm² (3.10um) | Flips a signal |
| Inverter (inv\_2) | 50k/mm² (4.22um) | 67k/mm² (3.10um) | 40k/mm² (4.22um) | Flips a signal (2x drive) |
| NAND gate (nand2\_1) | 57k/mm² (3.66um) | — | 46k/mm² (3.66um) | Basic logic gate |
| NAND gate (nand2\_2) | 35k/mm² (5.90um) | 44k/mm² (4.78um) | 29k/mm² (5.90um) | Basic logic gate (2x drive) |
| Buffer (buf\_1) | 50k/mm² (4.22um) | — | 40k/mm² (4.22um) | Strengthens a signal |
| Buffer (buf/buff\_2) | 39k/mm² (5.34um) | 50k/mm² (4.22um) | 32k/mm² (5.34um) | Strengthens a signal (2x drive) |
| Flip-flop (dffq\_1 / dfxtp\_2) | 12k/mm² (17.10um) | 13k/mm² (15.98um) | 10k/mm² (16.54um) | Stores one bit |

These are hard upper bounds — the density if you packed cells edge-to-edge with zero routing overhead.[^3]

The 3.3V library does not include minimum-size (`_1`) variants — its smallest cells are `_2` drive strength. At equivalent drive strength (`_2`), the 3.3V cells are consistently denser: 24–36% higher theoretical max than 5V cells of the same function.[^1] The 5V library's minimum-size `_1` cells are smaller than the 3.3V `_2` cells, but they are not equivalent — `_1` cells have weaker drive strength.

In practice, real designs achieve significantly less because:

- **(a) Routing overhead** — wires connecting cells consume area between rows
- **(b) Infrastructure cells** — fillers, taps, antenna diodes, and tie cells consume ~75% of cell instances on this reticle
- **(c) Mixed cell types** — designs use a mix of small and large cells
- **(d) Power planning** — power/ground rails consume area
- **(e) Clock distribution** — clock tree buffers and wiring take space

On this reticle, achieved densities range from 20–62% of the buffer theoretical max in the densest regions, and 2–44% averaged over the core area.[^4]

## Achieved Standard Cell Density — Design Averages

The following table shows the average logic standard cell density for each design's "core area" — the interior of the chip excluding the I/O pad ring (a ~350um border of large pads around the perimeter used for external connections).[^5]

All "% of max" figures compare against the buf theoretical maximum for the design's primary library: 50k/mm² for 7-track, 40k/mm² for 9-track.[^3]

### High Density (above 10k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Logic SC | SRAM | Description |
|---|---|---|---|---|---|---|
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 7t-5V | 22k | 44% | 316k | 0 | Cryptographic ASIC, densest design overall[^6] |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 16k | 31% | 36k | 2 | RISC-V SoC, quarter-size slot[^7] |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | mixed | 14k | 29% | 204k | 0 | Tiny Tapeout, 52 sub-designs[^8] |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | mixed | 14k | 29% | 204k | 0 | Tiny Tapeout, 52 sub-designs[^8] |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 7t-5V | 14k | 29% | 204k | 12 | FABulous eFPGA[^11] |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 7t-5V | 12k | 24% | 174k | 0 | JKU multi-project[^9] |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | 9t-5V | 10k | 25% | 145k | 0 | 8-core chess move generator, densest 9-track design[^10] |

### Medium Density (3k–10k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Logic SC | SRAM | Notes |
|---|---|---|---|---|---|---|
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 7t-5V | 7k | 14% | 101k | 40 | FazyRV Hachure SoC[^15] |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 9t-5V | 6k | 16% | 89k | 42 | KianV RISC-V Linux SoC[^18] |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 6k | 13% | 35k | 2 | TinyQV half-width slot[^13] |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 7t-5V | 6k | 13% | 35k | 18 | Racquet 9-core SERV SoC[^20] |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 6k | 12% | 36k | 2 | TinyQV half-height slot[^12] |
| [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) | 9t-5V | 6k | 15% | 36k | 12 | Racquet 6-core variant[^16] |
| [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) | mixed | 6k | 12% | 87k | 0 | Multi-project die[^14] |
| [GD03](https://github.com/gregdavill/gf180mcu-racquet/) | 7t-5V | 5k | 11% | 78k | 46 | Racquet 23-core SERV SoC[^19] |
| [RBOY](https://github.com/wren6991/riscboy-180) | 9t-5V | 5k | 12% | 70k | 60 | RISCBoy-180 games console[^22] |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 7t-5V | 4k | 8% | 58k | 16 | eFUSE/SRAM testchip[^21] |
| [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc) | 9t-5V | 4k | 10% | 22k | 0 | ATBS ADC digital core[^17] |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 9t-5V | 3k | 8% | 43k | 56 | TTA processor, SRAM-dominated[^25] |

### Low Density (below 3k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Logic SC | SRAM | Notes |
|---|---|---|---|---|---|---|
| [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) | 7t-3.3V | 2k | 5% | 34k | 16 | Only significant 3.3V design[^35] |
| MOSB | 9t-5V | 1k | 3% | 18k | 0 | [^28] |
| [WSLG](https://github.com/89Mods/ws-logo-die) | 7t-5V | 1k | 2% | 14k | 0 | Logo die[^26] |
| [HZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu) | 9t-5V | 1k | 2% | 5k | 0 | Z80 open-source CPU, half-width[^24] |
| [RZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file) | 9t-5V | <1k | <1% | 5k | 0 | Z80 open-source CPU, full-size[^23] |
| BRWN | 7t-5V | <1k | <1% | 4k | 0 | Brown University course project[^27] |

### Minimal (analog/test structures)

[OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) (122 logic cells, 7t-3.3V), [MOS2](https://github.com/AutoMOS-project/AutoMOS-chipathon2025/tree/update-for-ws) (0), [ISHI](https://github.com/ishi-kai/ISHI-KAI_Multiple_Projects_WaferSapce-GF180-1) (0), [TRID](https://github.com/Scafir/gf180mcu-project-trident-gf180-teststructure) (0).[^29]

## Achieved Density — Peak 1mm x 1mm Regions

While the averages above include sparse regions, the peak density in the best single 1mm x 1mm grid cell shows the maximum density achieved anywhere on each design:

| Design | Peak Logic SC/mm² | % of buf max | Library |
|---|---|---|---|
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 31k | 62% of 50k | 7t-5V |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 27k | 53% of 50k | 7t-5V |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 24k | 49% of 50k | mixed |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 24k | 49% of 50k | mixed |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 23k | 45% of 50k | 7t-5V |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 21k | 42% of 50k | 7t-5V |
| [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) | 13k | 26% of 50k | mixed |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 13k | 26% of 50k | 7t-5V |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 13k | 32% of 40k | 9t-5V |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | 12k | 31% of 40k | 9t-5V |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 12k | 31% of 40k | 9t-5V |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 12k | 23% of 50k | 7t-5V |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 12k | 24% of 50k | 7t-5V |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 12k | 23% of 50k | 7t-5V |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 11k | 23% of 50k | 7t-5V |

The highest achieved density on this reticle is 62% of the buf theoretical maximum, observed in the densest 1mm² region of [2975](https://github.com/ThorbenMoos/Cloneless1). The remaining 38% of the theoretical area is consumed by routing channels, infrastructure cells, power rails, and clock distribution.[^30]

## 7-Track vs 9-Track Library Comparison

Comparing designs that exclusively use one library (5V variants):

| Metric | 7-track 5V (mcu7t5v0) | 9-track 5V (mcu9t5v0) |
|---|---|---|
| Designs using this lib | 14 | 10 |
| Best core density | 22k SC/mm² · 44% of max ([2975](https://github.com/ThorbenMoos/Cloneless1)) | 10k SC/mm² · 25% of max ([CHES](https://github.com/Ravenslofty/gf180mcu-chess)) |
| Best peak grid cell | 31k SC/mm² · 62% of max ([2975](https://github.com/ThorbenMoos/Cloneless1)) | 13k SC/mm² · 32% of max ([KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/)) |
| Median core density | 5k SC/mm² · 10% of max | 4k SC/mm² · 10% of max |

The 7-track library achieves higher logic cell density on this reticle — roughly 2x at the top end.[^32] The theoretical advantage from row height alone is 24% (5.94/4.78 = 1.24x), so the observed 2x gap suggests that denser designs on this reticle tended to select the 7-track library.

## 3.3V vs 5V Library Comparison

The 3.3V library (`mcu7t3v3`) is used by only one design with significant logic: [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe), a Caravel OpenFrame design with 34k logic cells (2k SC/mm² core, 5% of buf max).[^35] [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) also uses it but with only 122 logic cells.[^36]

The 3.3V cells share the same row height (4.78um) as the 7-track 5V cells, but some are narrower because they don't need the extra transistor sizing required for 5V tolerance:[^1]

| Cell | 3.3V Width | 5V Width | 3.3V Advantage |
|---|---|---|---|
| nand2_2 | 4.78 um | 5.90 um | 19% narrower |
| mux2_2 | 7.58 um | 9.26 um | 18% narrower |
| inv_2 | 3.10 um | 4.22 um | 27% narrower |
| buf/buff_2 | 4.22 um | 5.34 um | 21% narrower |
| dfxtp_2 / dffq_1 | 15.98 um | 17.10 um | 7% narrower |

The 3.3V library's cells are 7–27% narrower than their 5V equivalents, meaning designs could theoretically achieve correspondingly higher density. With only one design using this library on this reticle, we cannot compare achieved density between the voltage variants. [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe)'s core density of 2k SC/mm² (5% of buf max) reflects its purpose as an SRAM characterization vehicle with minimal control logic, not a limitation of the library.

## Most Common Logic Cell Types

The 15 most-used logic cell types across all unique designs on the reticle:[^45]

| Cell Type | Library | Instances | What it does |
|---|---|---|---|
| nand2_1 | 7t-5V | 221k | 2-input NAND gate (smallest) |
| nor2_1 | 7t-5V | 92k | 2-input NOR gate |
| oai21_1 | 7t-5V | 89k | OR-AND-Invert compound gate |
| dffq_1 | 7t-5V | 87k | D flip-flop (1 bit storage) |
| aoi21_1 | 7t-5V | 77k | AND-OR-Invert compound gate |
| nand2_1 | 9t-5V | 76k | 2-input NAND gate (9-track) |
| clkinv_1 | 7t-5V | 74k | Clock inverter |
| xor2_1 | 7t-5V | 74k | 2-input XOR gate |
| buf_1 | 7t-5V | 60k | Buffer (smallest) |
| buf_2 | 7t-5V | 58k | Buffer (2x drive) |
| latq_1 | 7t-5V | 55k | Latch (level-sensitive) |
| mux2_2 | 7t-5V | 53k | 2-input multiplexer |
| dlyb_1 | 7t-5V | 45k | Delay buffer |
| nand3_1 | 7t-5V | 38k | 3-input NAND gate |
| aoi22_1 | 7t-5V | 33k | AND-OR-Invert (2x2 inputs) |

NAND2 gates are the most-used cell (221k 7-track + 76k 9-track = 297k total). The combined NAND2:flip-flop ratio across the reticle is ~3:1 (297k NAND2 vs 101k flip-flops).[^45]

## SRAM Block Usage

SRAM (Static Random-Access Memory) blocks are pre-designed memory macros provided by the foundry. Unlike standard cells, which are composed by automated tools, SRAM blocks are hand-optimized fixed-size units designed to store data as densely as possible.

14 of the 24 designs include SRAM blocks:[^33]

### SRAM-Heavy (40+ blocks, dominating the die)

| Design | SRAM Blocks | Logic SC | Notes |
|---|---|---|---|
| [RBOY](https://github.com/wren6991/riscboy-180) | 60 | 70k | Most SRAM blocks of any design[^34] |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 56 | 43k | [^25] |
| [GD03](https://github.com/gregdavill/gf180mcu-racquet/) | 46 | 78k | [^19] |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 42 | 89k | [^18] |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 40 | 101k | [^15] |

### SRAM-Moderate (10–39 blocks)

| Design | SRAM Blocks | Logic SC | Notes |
|---|---|---|---|
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 18 | 35k | [^20] |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 16 | 58k | [^21] |
| [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) | 16 | 34k | SRAM characterization, 3.3V library[^35] |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 12 | 204k | [^11] |
| [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) | 12 | 36k | [^16] |

### SRAM-Light (1–9 blocks)

| Design | SRAM Blocks | Logic SC | Notes |
|---|---|---|---|
| [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) | 8 | 122 | SRAM test vehicle[^36] |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 2 | 36k | [^7] |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 2 | 36k | [^12] |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 2 | 35k | [^13] |

## SRAM vs Standard Cell Transistor Density

A critical comparison: how does the transistor density inside a foundry-provided SRAM block compare to the density achieved by packing standard cells?

"Transistor density" here counts the number of distinct regions where a gate electrode (polysilicon) crosses an active area (diffusion) — each such crossing forms one transistor.[^37]

### Theoretical Maximum Transistor Density for Standard Cells

The transistor density achievable with standard cells depends on which cell type is packed. Larger, more complex cells contain more transistors per cell but are wider, so the relationship is not linear:[^46]

| Cell (7-track 5V) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| inv\_1 | 3.10 um | 67k | 2 | 135k/mm² |
| buf\_1 | 4.22 um | 50k | 4 | 198k/mm² |
| nand2\_1 | 3.66 um | 57k | 4 | 229k/mm² |
| dffq\_1 | 17.10 um | 12k | 24 | 294k/mm² |

| Cell (9-track 5V) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| inv\_1 | 3.10 um | 54k | 2 | 109k/mm² |
| buf\_1 | 4.22 um | 40k | 4 | 160k/mm² |
| nand2\_1 | 3.66 um | 46k | 4 | 184k/mm² |
| dffq\_1 | 16.54 um | 10k | 24 | 244k/mm² |

A mm² packed entirely with flip-flops would achieve 294k trans/mm² (7-track) or 244k trans/mm² (9-track). A mm² of inverters would achieve only 135k/109k trans/mm². Real designs use a mix of cell types, so the achievable transistor density depends on the design's cell mix.

### SRAM Macros (foundry-provided, hand-optimized)[^38]

| Macro | Size | Trans/mm² | % of 7t dffq\_1 max | Notes |
|---|---|---|---|---|
| sram1024x8 (OCD) | 301 x 516 um | 385k/mm² | 131% | Exceeds stdcell theoretical max |
| sram512x8 (OCD) | 301 x 322 um | 332k/mm² | 113% | Exceeds stdcell theoretical max |
| sram256x8 (OCD) | 301 x 225 um | 270k/mm² | 92% | |
| sram512x8 (standard) | 432 x 485 um | 154k/mm² | 52% | Most commonly used |
| sram256x8 (standard) | 432 x 341 um | 124k/mm² | 42% | |
| sram128x8 | 432 x 269 um | 98k/mm² | 33% | |
| sram64x8 | 432 x 233 um | 79k/mm² | 27% | Below inv theoretical max (135k) |

The standard SRAM macros (79k–154k trans/mm²) fall between the theoretical max of an all-inverter design (135k) and an all-NAND2 design (229k). Only the OCD SRAM variants exceed the theoretical stdcell maximum for any cell type.[^38]

### Best Standard Cell Regions (automated place-and-route)[^39]

| Design | Peak 1mm² Trans/mm² | % of dffq\_1 max | Library |
|---|---|---|---|
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 305k/mm² | 104% of 7t max | 7t-5V |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 297k/mm² | 101% of 7t max | mixed |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 296k/mm² | 101% of 7t max | 7t-5V |
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 292k/mm² | 99% of 7t max | 7t-5V |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 258k/mm² | 88% of 7t max | 7t-5V |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 252k/mm² | 86% of 7t max | 7t-5V |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | 234k/mm² | 96% of 9t max | 9t-5V |

The top designs achieve 96–104% of the flip-flop theoretical transistor density maximum — meaning the densest 1mm² regions on this reticle pack transistors almost as tightly as if they were filled entirely with flip-flops edge-to-edge with no routing. This is possible because the real cell mix includes cells with higher transistor-per-area ratios than dffq\_1, and infrastructure cells (which are excluded from logic counts but still contain transistors) contribute to the transistor count.[^39]

### Comparison

The most commonly used SRAM macro (sram512x8 standard, 154k trans/mm², 52% of dffq\_1 max) has **lower** transistor density than the best standard cell regions on this reticle (250k–305k trans/mm², 86–104% of dffq\_1 max).

The standard SRAM macros (`gf180mcu_fd_ip_sram`) include peripheral circuits (address decoders, sense amplifiers, I/O drivers) surrounding the compact bitcell array. The 6-transistor SRAM bitcells themselves are extremely dense, but the peripheral overhead brings the overall macro density down — and the overhead is proportionally larger for smaller macros (sram64x8 at 79k trans/mm² vs sram512x8 at 154k trans/mm²).[^40]

The OCD SRAM variants (`gf180mcu_ocd_ip_sram`) at 270k–385k trans/mm² are 2–3x denser than the standard variants, and the largest (sram1024x8 at 385k, 131% of dffq\_1 max) exceeds the theoretical maximum for any single standard cell type.[^41]

At the whole-chip level, [BTAP](https://github.com/polyfractal/BreakingTTAPs) (56 SRAM blocks) achieves 153k trans/mm² core average (52% of dffq\_1 max), while [2975](https://github.com/ThorbenMoos/Cloneless1) (pure stdcell, no SRAM) achieves 253k trans/mm² core average (86% of dffq\_1 max) — 65% higher.[^42]

## Key Findings

1. The densest logic standard cell design, [2975](https://github.com/ThorbenMoos/Cloneless1) (Cloneless1), achieves **22k logic SC/mm²** averaged over its core (44% of buf max), with a peak of **31k logic SC/mm²** (62% of buf max) in its densest 1mm² region.[^6] [^30]

2. Three standard cell libraries are used: **7-track 5V** (77% of logic cells), **9-track 5V** (21%), and **7-track 3.3V** (1%). The 3.3V cells are 7–27% narrower than 5V equivalents for the same function but are used by only [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) and [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) on this reticle.[^1] [^2]

3. The 7-track 5V library achieves roughly **2x higher peak density** than the 9-track 5V library on this reticle (31k vs 13k peak SC/mm²), exceeding the 24% theoretical advantage from row height.[^32]

4. Standard cell transistor density (up to **305k/mm²** in [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga), 104% of dffq\_1 theoretical max) exceeds the most commonly used foundry SRAM macro (154k/mm², 52% of dffq\_1 max). Only the OCD SRAM variants (up to 385k/mm², 131% of dffq\_1 max) exceed the stdcell theoretical limit.[^38] [^39] [^40] [^46]

5. Infrastructure cells (fillers, taps, antenna diodes, ties) outnumber logic cells **nearly 3:1** across the reticle (5.6M vs 2.1M). Any density analysis must exclude these to avoid dramatically overstating actual logic content.[^44]

6. The most common logic cell is **nand2_1** (297k instances across both libraries), followed by nor2_1 (118k) and oai21_1 (107k). The NAND2:flip-flop ratio across the reticle is ~3:1.[^45]

---

## Footnotes

[^1]: The 3.3V library (`gf180mcu_as_sc_mcu7t3v3`) and 5V library (`gf180mcu_fd_sc_mcu7t5v0`) share the same 4.78um row height. Cell width comparison measured from layout bounding boxes: 3.3V nand2_2 = 4.78um vs 5V nand2_2 = 5.90um (19% narrower); 3.3V inv_2 = 3.10um vs 5V inv_2 = 4.22um (27% narrower); 3.3V buff_2 = 4.22um vs 5V buf_2 = 5.34um (21% narrower); 3.3V mux2_2 = 7.58um vs 5V mux2_2 = 9.26um (18% narrower); 3.3V dfxtp_2 = 15.98um vs 5V dffq_1 = 17.10um (7% narrower).

[^2]: Library usage determined by the `count_stdcell_usage` bottom-up hierarchy walk, classifying each cell instance by its library prefix (mcu7t5v0, mcu9t5v0, mcu7t3v3). Counts exclude infrastructure cells. [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2): 200k mcu7t5v0 + 4k mcu9t5v0. [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/): 84k mcu7t5v0 + 2k mcu9t5v0. [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc): 22k mcu9t5v0 + 5 mcu7t5v0. [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe): 34k mcu7t3v3 + 2 mcu7t5v0.

[^3]: Theoretical maximum = (1000um / cell\_width) x (1000um / row\_height) for a single cell type filling 1mm² with zero routing overhead. 7-track row height = 4.78um, 9-track = 5.94um. Cell dimensions from layout bounding boxes. The 3.3V library only includes `_2` and larger drive strengths (no `_1` variants). At `_2` drive strength: 3.3V inv\_2 = 3.10um → 67k/mm² vs 5V inv\_2 = 4.22um → 50k/mm² (3.3V is 36% denser); 3.3V nand2\_2 = 4.78um → 44k/mm² vs 5V nand2\_2 = 5.90um → 35k/mm² (3.3V is 24% denser); 3.3V buff\_2 = 4.22um → 50k/mm² vs 5V buf\_2 = 5.34um → 39k/mm² (3.3V is 27% denser).

[^4]: Achieved-vs-theoretical ratios observed on this reticle: peak grid cell ranges from 62% of buf max ([2975](https://github.com/ThorbenMoos/Cloneless1)) down to <1% ([RZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file)). Core averages range from 44% ([2975](https://github.com/ThorbenMoos/Cloneless1)) down to <1%.

[^5]: Core area estimated as (die\_width - 0.70mm) x (die\_height - 0.70mm), subtracting a 350um pad ring border on each side. I/O pad cells are 350um tall as measured in the layout. Full-size slots: die = 3.93 x 5.12mm, core = 3.23 x 4.42mm = 14.3mm². Half-height: die = 3.93 x 2.53mm, core = 3.23 x 1.83mm = 5.9mm². Half-width: die = 1.94 x 5.12mm, core = 1.24 x 4.42mm = 5.5mm². Quarter: die = 1.94 x 2.53mm, core = 1.24 x 1.83mm = 2.3mm².

[^6]: [2975](https://github.com/ThorbenMoos/Cloneless1) (`2975_chip_top`): 316k logic cells in 14.3mm² core = 22k SC/mm² (44% of 7t buf max). Peak grid cell: 31k SC/mm² (62% of max). 3,615k transistor regions. Zero SRAM, 33 pads.

[^7]: [TQVA](https://github.com/MichaelBell/ws01-tinyQV) (`TQVA_chip_top_14_8`): 36k logic cells in quarter-size slot (1.94 x 2.53mm die, 2.3mm² core). Core density 16k SC/mm² (31% of max). mcu7t5v0. 2 SRAM blocks, 57 pads.

[^8]: [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) and [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) are [Tiny Tapeout](https://tinytapeout.com) shuttle designs, each containing 52 independent user projects multiplexed onto shared I/O via `tt_mux` cells. Each user design's stdcells are prefixed with a unique 2-character hash (e.g., `OH_`, `ZI_`) to avoid naming collisions. ~200k mcu7t5v0 + ~4k mcu9t5v0 logic cells per chip. 14k SC/mm² core (29% of max). 75 pads, 0 SRAM.

[^9]: [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) (`JKU1_chip_top_10_0`): 174k logic cells, 12k SC/mm² core (24% of max). mcu7t5v0 exclusively. 3,155k transistors. No SRAM, 75 pads.

[^10]: [CHES](https://github.com/Ravenslofty/gf180mcu-chess) (`CHES_chip_top_10_4`): 145k logic cells, 10k SC/mm² core (25% of 9t buf max). mcu9t5v0 exclusively — the highest density achieved with the 9-track library on this reticle. 2,717k transistors. No SRAM, 75 pads.

[^11]: [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) (`MOLE_chip_top_8_4`): 204k logic cells, 14k SC/mm² core (29% of max). mcu7t5v0. 3,419k transistors (second highest on reticle). 12 SRAM blocks, 75 pads.

[^12]: [TQVC](https://github.com/MichaelBell/ws01-tinyQV) (`TQVC_chip_top`, 2 placements): 36k logic cells in half-height slot. Core density 6k SC/mm² (12% of max). mcu7t5v0. 2 SRAM blocks, 73 pads.

[^13]: [TQVB](https://github.com/MichaelBell/ws01-tinyQV) (`TQVB_chip_top_14_6`): 35k logic cells in half-width slot. Core density 6k SC/mm² (13% of max). mcu7t5v0. 2 SRAM, 73 pads.

[^14]: [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) (`AS03_chip_top_6_0`): 87k logic cells, 6k SC/mm² core (12% of max). Mixed: 84k mcu7t5v0 + 2k mcu9t5v0. No SRAM, 75 pads.

[^15]: [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) (`CAFE_chip_top_12_0`): 101k logic cells, 7k SC/mm² core (14% of max). mcu7t5v0. 40 SRAM blocks. Peak grid cell: 21k SC/mm² (42% of max). 75 pads.

[^16]: [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) (`GD04_chip_top`, 2 placements): 36k logic cells in half-height slot. Core 6k SC/mm² (15% of 9t max). mcu9t5v0. 12 SRAM blocks, 73 pads.

[^17]: [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc) (`JKU2_chip_top_0_8`): 22k logic cells in half-height slot. Core 4k SC/mm² (10% of 9t max). Primarily mcu9t5v0. No SRAM.

[^18]: [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) (`KIAN_chip_top_8_0`): 89k logic cells, 6k SC/mm² core (16% of 9t max). mcu9t5v0 exclusively. 42 SRAM blocks. Notably uniform logic density: only 1.1x variation across its logic area. 75 pads.

[^19]: [GD03](https://github.com/gregdavill/gf180mcu-racquet/) (`GD03_chip_top_6_6`): 78k logic cells, 5k SC/mm² core (11% of max). mcu7t5v0. 46 SRAM blocks — SRAM covers nearly all non-pad-ring grid cells. 75 pads.

[^20]: [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) (`GD02_chip_top_14_4`): 35k logic cells in half-width slot. Core 6k SC/mm² (13% of max). mcu7t5v0. 18 SRAM blocks, 73 pads.

[^21]: [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) (`TZ01_chip_top`, 2 placements): 58k logic cells, 4k SC/mm² core (8% of max). mcu7t5v0. 16 SRAM blocks, 75 pads.

[^22]: [RBOY](https://github.com/wren6991/riscboy-180) (`RBOY_chip_top_12_6`): 70k logic cells, 5k SC/mm² core (12% of 9t max). mcu9t5v0. 60 SRAM blocks — the most of any design. SRAM dominates so completely that no grid cells show non-zero logic stdcell counts. 75 pads.

[^23]: [RZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file) (`RZ80_chip_top`, 2 placements): 5k logic cells, <1k SC/mm² core (<1% of 9t max). mcu9t5v0. No SRAM, 75 pads.

[^24]: [HZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu) (`HZ80_chip_top_14_0`): 5k logic cells in half-width slot. Core 1k SC/mm² (2% of 9t max). mcu9t5v0. No SRAM, 73 pads.

[^25]: [BTAP](https://github.com/polyfractal/BreakingTTAPs) (`BTAP_chip_top`, 2 placements): 43k logic cells, 3k SC/mm² core (8% of 9t max). mcu9t5v0. 56 SRAM blocks dominate die area. 75 pads.

[^26]: [WSLG](https://github.com/89Mods/ws-logo-die) (`WSLG_chip_top_10_2`): 14k logic cells, 1k SC/mm² core (2% of max). mcu7t5v0. No SRAM, 75 pads. Has a distinctive hollow center (zero transistors in middle grid cells), suggesting a large unused region or decorative structure.

[^27]: BRWN (`BRWN_ENGN2912E_TOP_8_2`): 4k logic cells, <1k SC/mm² core (<1% of max). mcu7t5v0. No SRAM, 75 pads. Brown University course project.

[^28]: MOSB (`MOSB_chip_top`, 2 placements): 18k logic cells, 1k SC/mm² core (3% of 9t max). mcu9t5v0. No SRAM, 75 pads.

[^29]: [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test): 122 logic cells (120 mcu7t3v3 + 2 mcu7t5v0), 8 SRAM blocks. [MOS2](https://github.com/AutoMOS-project/AutoMOS-chipathon2025/tree/update-for-ws): 0 logic cells (all stdcells were infrastructure), 163 pads. [ISHI](https://github.com/ishi-kai/ISHI-KAI_Multiple_Projects_WaferSapce-GF180-1): 0 logic cells, 196 pads. [TRID](https://github.com/Scafir/gf180mcu-project-trident-gf180-teststructure): 0 stdcells of any kind, 95 pads.

[^30]: [2975](https://github.com/ThorbenMoos/Cloneless1)'s peak of 31k logic SC/mm² represents 62% of the 7t buf theoretical max of 50k/mm². The remaining 38% is consumed by routing channels, infrastructure cells (~59% of all stdcell instances in 2975), power rails, and clock distribution.

[^32]: Comparing 7-track 5V vs 9-track 5V achieved logic density: 7-track best = 22k (44% of 50k max), 9-track best = 10k (25% of 40k max). 7-track median = 5k (10% of max), 9-track median = 4k (10% of max). The theoretical ratio from row heights alone is 5.94/4.78 = 1.24x.

[^33]: SRAM block counts determined by merging all shapes on GDS layer 108/5 (SramCore) within each design's cell hierarchy and counting distinct merged polygons.

[^34]: [RBOY](https://github.com/wren6991/riscboy-180) uses 60 SRAM blocks in a 20.1mm² die — approximately 3.0 blocks per mm².

[^35]: [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) (`OCD1_caravel_openframe_top`): Caravel OpenFrame design with 16 SRAM blocks and 34k logic cells — almost entirely from the 3.3V library (mcu7t3v3: 34,429 logic cells). This is the only design on the reticle making significant use of the 3.3V standard cell library. 1,529k transistors, 64 pads. Core density 2k SC/mm² (5% of buf max).

[^36]: [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) (`OCD2_gf180mcu_ocd_sram_top`): OpenRAM SRAM characterization design. 8 SRAM blocks, 122 logic cells (120 mcu7t3v3 + 2 mcu7t5v0), 251k transistors in a half-height slot.

[^37]: Transistor count methodology: shapes on the COMP layer (GDS 22/0, diffusion/active area) are boolean-AND'd with shapes on the Poly2 layer (GDS 30/0, gate polysilicon). Each distinct merged polygon in the result represents one transistor gate crossing. This counts NMOS and PMOS gates separately.

[^38]: SRAM macro transistor density measured by applying the COMP & Poly2 intersection methodology to individual SRAM macro cells. "Standard" macros (`gf180mcu_fd_ip_sram`) are 432um wide; "OCD" variants (`gf180mcu_ocd_ip_sram`) are 301um wide. Size variants: 64x8, 128x8, 256x8, 512x8, 1024x8 (words x bits).

[^39]: Peak stdcell transistor density from the 1mm x 1mm grid analysis, excluding grid cells that overlap SRAM regions. [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) peak: 305k trans/mm². [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2): 297k. [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure): 296k. [2975](https://github.com/ThorbenMoos/Cloneless1): 292k.

[^40]: SRAM macros contain: (1) the bitcell array — extremely dense 6-transistor cells; (2) row decoders; (3) column multiplexers; (4) sense amplifiers; (5) write drivers; (6) control logic; (7) power rings and guard bands. Categories 2–7 ("peripherals") surround the bitcell array, and their area overhead is proportionally larger for smaller macros — which explains the density progression from sram64x8 (79k/mm²) to sram1024x8 (385k/mm²).

[^41]: The OCD SRAM variants (270k–385k trans/mm²) are 2–3x denser than the standard variants (79k–154k trans/mm²).

[^42]: Whole-chip transistor density comparison: [BTAP](https://github.com/polyfractal/BreakingTTAPs) (56 SRAM blocks) achieves 153k trans/mm² core average. [2975](https://github.com/ThorbenMoos/Cloneless1) (pure stdcell) achieves 253k trans/mm² core average — 65% higher despite having no hand-optimized SRAM.

[^44]: Infrastructure cell analysis: across the 24 unique designs, infrastructure cells (fill, fillcap, endcap, filltie, tap, antenna, diode, tiel, tieh) total 5,572k instances vs 2,054k logic cell instances. 14,050 unique logic cell definitions were identified across 455 distinct cell types, while 2,347 infrastructure definitions span 47 types. The exclusion list was validated by reviewing all cell types for logic function.

[^45]: Cell type usage computed by the `count_stdcell_usage` bottom-up hierarchy walk with per-cell caching. Counts are summed across unique designs (duplicate slot placements counted once). Combined NAND2 total: 221k (7t-5V) + 76k (9t-5V) = 297k. Combined flip-flop total: 87k dffq_1 (7t-5V) + 14k dffq_1 (9t-5V) = 101k.

[^46]: Transistor-per-cell counts measured by applying the COMP & Poly2 intersection methodology (see footnote 37) to individual standard cell definitions. inv\_1: 2 transistors (1 NMOS + 1 PMOS). buf\_1: 4 transistors (two inverter stages). nand2\_1: 4 transistors (2 NMOS series + 2 PMOS parallel). dffq\_1: 24 transistors (transmission-gate master-slave flip-flop with output buffer). Theoretical transistor density max = (transistors/cell) x (cells/mm²). The dffq\_1 theoretical max (294k trans/mm² for 7-track) is the highest because flip-flops pack 24 transistors into 17.10um width — a higher transistor-to-area ratio than simpler cells. The fact that some designs exceed 100% of this theoretical max indicates that the real cell mix, combined with transistors in infrastructure cells, can exceed the density of any single cell type packed alone.

---

*Data source: `analyze_layout.py` applied to `ws-run1/reticle.oas` (320MB). Analysis method: KLayout boolean geometry operations on GDS layers. Grid resolution: 1mm x 1mm. All density figures rounded to nearest 1k. Standard cell counts exclude infrastructure cells (fill, endcap, filltie, fillcap, tap, antenna, diode, tiel, tieh). Three standard cell library prefixes matched: `gf180mcu_fd_sc_`, `gf180mcu_as_sc_`, `gf180mcu_as_ex_`. Project links from [ws-run1 README](https://github.com/wafer-space/ws-run1).*
