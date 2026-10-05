# wafer.space GF180MCU Run 1 — Standard Cell & SRAM Density Report

**GF180MCU Process (GlobalFoundries 180nm), Shuttle G801**

## Introduction

This report analyzes the standard cell and SRAM density achieved by the 30 unique public chip designs on the [wafer.space](https://wafer.space/) GF180MCU Run 1 reticle. The reticle has 40 slots; the public layout contains 38 slot placements (some designs appear more than once, and private designs are not included).

All designs were fabricated on GlobalFoundries' GF180MCU process, a 180-nanometer (0.18um) technology node. This is a mature, relatively large-geometry process — for comparison, modern smartphone chips use 3nm or 5nm processes with features roughly 50x smaller.

> **Note on counting methodology:** All standard cell counts in this report count only **logic cells** — cells that perform actual computation (gates, flip-flops, buffers, multiplexers, etc.). Infrastructure cells are excluded: filler cells (fill, fillcap, endcap, filltie), well taps, antenna fix diodes, ESD diodes, and tie-high/tie-low cells. These infrastructure cells are inserted by automated tools to satisfy manufacturing rules but perform no logic function. On this reticle there are 6.0M infrastructure cell instances and 2.1M logic cell instances across the unique designs — 2.8 infrastructure cells for every logic cell.

## What Are Standard Cells?

A "standard cell" is a pre-designed, pre-verified building block used to construct digital circuits. Think of them like LEGO bricks for chip design: each cell performs one simple logic function (an AND gate, a flip-flop for storing one bit, a buffer for boosting signal strength), and a chip designer assembles thousands or millions of them to build complex circuits.

Standard cells in a library all share the same height (so they line up in rows) but vary in width depending on their function. Automated tools place these cells in rows and then route wires between them.

The "density" of standard cells — how many fit per square millimeter — is a key measure of how efficiently a design uses its silicon area. Higher density generally means more logic functionality packed into less chip area, which reduces cost.

## Standard Cell Libraries on This Reticle

| Library | Row Height | Rows per mm | Relative Density | Logic instances | Share |
|---|---|---|---|---|---|
| mcu7t5v0 (7-track, 5V) | 3.92 um | 255 rows | 100% | 1.7M | 78% |
| mcu9t5v0 (9-track, 5V) | 5.04 um | 198 rows | 78% | 443k | 21% |
| mcu7t3v3 (7-track, 3.3V) | 3.92 um | 255 rows | 100% | 35k | 2% |

Row height is the height of the cells' placement boundary, which is what rows are stacked at. Taller rows hold fewer cells per mm² but leave more room for wiring inside the cell.

Most designs use one library exclusively. The designs that mix libraries are: [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) (84k mcu7t5v0 + 2k mcu9t5v0); [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) (120 mcu7t3v3 + 2 mcu7t5v0); [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) (200k mcu7t5v0 + 4k mcu9t5v0); [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) (200k mcu7t5v0 + 4k mcu9t5v0).

## Theoretical Maximum Standard Cell Density

If you filled an entire square millimeter with nothing but one type of logic standard cell (no wiring, no gaps, no infrastructure cells), the theoretical maximum density would be:

| Cell Type | 7t-5V | 9t-5V | 7t-3.3V | What it does |
|---|---|---|---|---|
| Inverter | 114k/mm² (inv_1, 2.24um) | 89k/mm² (inv_1, 2.24um) | 114k/mm² (inv_2, 2.24um) | Flips a signal |
| NAND gate | 91k/mm² (nand2_1, 2.80um) | 71k/mm² (nand2_1, 2.80um) | 65k/mm² (nand2_2, 3.92um) | Basic logic gate |
| Buffer | 76k/mm² (buf_1, 3.36um) | 59k/mm² (buf_1, 3.36um) | 76k/mm² (buff_2, 3.36um) | Strengthens a signal |
| Flip-flop | 16k/mm² (dffq_1, 16.24um) | 13k/mm² (dffq_1, 15.68um) | 17k/mm² (dfxtp_2, 15.12um) | Stores one bit |

These are hard upper bounds — the density if you packed cells edge-to-edge with zero routing overhead. For each library the smallest cell of that kind is used; the 3.3V library has no drive strength 1 cells, so its smallest cells are the `_2` variants.

In practice, real designs achieve significantly less because:

- **(a) Routing overhead** — wires connecting cells need room, which limits how tightly cells can be placed
- **(b) Infrastructure cells** — fillers, taps, antenna diodes, and tie cells make up 74% of cell instances on this reticle
- **(c) Mixed cell types** — designs use a mix of small and large cells
- **(d) Power planning** — power/ground straps consume area
- **(e) Clock distribution** — clock tree buffers and wiring take space

## Achieved Standard Cell Density — Design Averages

The following tables show the average logic standard cell density for each design's "core area" — the interior of the chip excluding the I/O pad ring (a 350um border of large pads around the perimeter used for external connections).

"% of max" compares against the buffer theoretical maximum for the design's primary library. "Cell area" is the share of the core area actually covered by logic cells — the placement utilisation of the die as a whole, including any area left empty or given to SRAM.

### High Density (above 10k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Cell area | Logic SC | SRAM | Project |
|---|---|---|---|---|---|---|---|
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 7t-5V | 22k | 29% | 50% | 316k | 0 | Cloneless1 |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 16k | 21% | 36% | 36k | 1 | TinyQV - Crowdsourced Risc-V SoC |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | mixed | 14k | 19% | 42% | 204k | 0 | Tiny Tapeout GF 0.2 |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | mixed | 14k | 19% | 42% | 204k | 0 | Tiny Tapeout GF 0p2 - Power Gated Variant |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 7t-5V | 14k | 19% | 45% | 204k | 6 | FABulous FPGA |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 7t-5V | 12k | 16% | 26% | 174k | 0 | gf180mcu-jku-projects |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | 9t-5V | 10k | 17% | 31% | 145k | 0 | chess-move-generator |

### Medium Density (3k–10k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Cell area | Logic SC | SRAM | Project |
|---|---|---|---|---|---|---|---|
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 7t-5V | 7k | 9% | 24% | 101k | 20 | FazyRV Hachure |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 6k | 9% | 15% | 35k | 1 | TinyQV - Crowdsourced Risc-V SoC (0.5x1) |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 7t-5V | 6k | 8% | 17% | 35k | 9 | Racquet Half r1p0 (1/2 slot) |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 9t-5V | 6k | 11% | 22% | 89k | 21 | KianV: A 32-bit RISC-V Linux SoC taped out on GF180MCU |
| [RZML](https://gitlab.com/rejunity/ws0-lgn-fxnist-gf180mcu-tapeout) | 7t-5V | 6k | 8% | 20% | 88k | 0 | LGN FashionMNIST - Logic Gate Network trained on FashioMNIST |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 7t-5V | 6k | 8% | 14% | 36k | 1 | TinyQV - Crowdsourced Risc-V SoC (1x0.5) |
| [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) | mixed | 6k | 8% | 17% | 87k | 0 | WS-Multi |
| [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) | 9t-5V | 6k | 10% | 24% | 36k | 6 | Racquet Wide 1x0.5 |
| [GD03](https://github.com/gregdavill/gf180mcu-racquet/) | 7t-5V | 5k | 7% | 15% | 78k | 23 | Racquet r2p0 - 23 core SoC |
| [RBOY](https://github.com/wren6991/riscboy-180) | 9t-5V | 5k | 8% | 21% | 70k | 30 | RISCBoy-180 |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 7t-5V | 4k | 5% | 12% | 58k | 8 | TillitisZedulo-testchip2025 |
| [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc) | 9t-5V | 4k | 6% | 16% | 22k | 0 | gf180mcu-jku-atbs-adc |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 9t-5V | 3k | 5% | 9% | 43k | 28 | BreakingTTAPs |

### Low Density (below 3k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Cell area | Logic SC | SRAM | Project |
|---|---|---|---|---|---|---|---|
| [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) | 7t-3.3V | 2k | 3% | 7% | 34k | 8 | openframe_caravel_picorv32 |
| MOSB | 9t-5V | 1k | 2% | 4% | 18k | 0 | MOSbiusV3 |
| [WSLG](https://github.com/89Mods/ws-logo-die) | 7t-5V | 1k | 1% | 4% | 14k | 0 | Wafer.Space Logo |
| [HZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu) | 9t-5V | 1k | 2% | 3% | 5k | 0 | FOSSi open-source replacement for Z80 classic 8-bit CPU (0.5 x 1 slot) |
| [RZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file) | 9t-5V | <1k | 1% | 1% | 5k | 0 | FOSSi open-source replacement for Z80 classic 8-bit CPU |
| BRWN | 7t-5V | <1k | <1% | 1% | 4k | 0 | FA25_Engn2912e_Saligane_Brown |

### Minimal (analog, custom or test structures)

These designs contain fewer than 1,000 logic standard cells:

| Design | Logic SC | Transistors | SRAM | Pads | Project |
|---|---|---|---|---|---|
| [ISHI](https://github.com/ishi-kai/ISHI-KAI_Multiple_Projects_WaferSapce-GF180-1) | 0 | 227k | 0 | 196 | ISHI-KAI's Multiple Users Project |
| [MOS2](https://github.com/AutoMOS-project/AutoMOS-chipathon2025/tree/update-for-ws) | 0 | 241k | 0 | 163 | AutoMOS-Chipathon-2025 full size |
| [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) | 122 | 251k | 4 | 73 | ocd_sram_test |
| [TRID](https://github.com/Scafir/gf180mcu-project-trident-gf180-teststructure) | 0 | 102k | 0 | 95 | gf180mcu-project-trident-gf180-teststructure |

## Achieved Density — Peak 1mm x 1mm Regions

While the averages above include sparse regions, the peak density in the best single 1mm x 1mm grid cell shows the maximum density achieved anywhere on each design. Grid cells that overlap an SRAM macro are excluded.

| Design | Peak Logic SC/mm² | % of buffer max | Library |
|---|---|---|---|
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 31k | 41% of 76k | 7t-5V |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 27k | 35% of 76k | 7t-5V |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 24k | 32% of 76k | mixed |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 24k | 32% of 76k | mixed |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 23k | 30% of 76k | 7t-5V |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 21k | 27% of 76k | 7t-5V |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 13k | 17% of 76k | 7t-5V |
| [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) | 13k | 17% of 76k | mixed |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 13k | 22% of 59k | 9t-5V |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | 12k | 21% of 59k | 9t-5V |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 12k | 21% of 59k | 9t-5V |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 12k | 16% of 76k | 7t-5V |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 12k | 15% of 76k | 7t-5V |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 12k | 15% of 76k | 7t-5V |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 11k | 15% of 76k | 7t-5V |

The highest achieved density on this reticle is 41% of the buffer theoretical maximum, observed in the densest 1mm² region of [2975](https://github.com/ThorbenMoos/Cloneless1). The rest of that area is consumed by larger cells, infrastructure cells and the gaps left for routing.

## Library Comparison

Comparing designs that use one library exclusively:

| Metric | mcu7t5v0 (7-track, 5V) | mcu9t5v0 (9-track, 5V) | mcu7t3v3 (7-track, 3.3V) |
|---|---|---|---|
| Designs using this library | 13 | 9 | 1 |
| Best core density | 22k SC/mm² · 29% of max ([2975](https://github.com/ThorbenMoos/Cloneless1)) | 10k SC/mm² · 17% of max ([CHES](https://github.com/Ravenslofty/gf180mcu-chess)) | 2k SC/mm² · 3% of max ([OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe)) |
| Best peak grid cell | 31k SC/mm² · 41% of max ([2975](https://github.com/ThorbenMoos/Cloneless1)) | 13k SC/mm² · 22% of max ([KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/)) | 6k SC/mm² · 8% of max ([OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe)) |
| Median core density | 6k SC/mm² · 8% of max | 4k SC/mm² · 6% of max | 2k SC/mm² · 3% of max |

Differences between libraries here reflect which designs chose which library as much as the libraries themselves; the theoretical difference from row height alone is in the table above.

## Most Common Logic Cell Types

The 15 most-used logic cell types across all unique designs on the reticle:

| Cell Type | Library | Instances | What it does |
|---|---|---|---|
| nand2_1 | 7t-5V | 228k | 2-input NAND gate |
| nor2_1 | 7t-5V | 99k | 2-input NOR gate |
| oai21_1 | 7t-5V | 94k | OR-AND-Invert compound gate |
| dffq_1 | 7t-5V | 87k | D flip-flop (1 bit storage) |
| aoi21_1 | 7t-5V | 81k | AND-OR-Invert compound gate |
| xor2_1 | 7t-5V | 81k | 2-input XOR gate |
| nand2_1 | 9t-5V | 76k | 2-input NAND gate |
| clkinv_1 | 7t-5V | 76k | Clock inverter |
| buf_2 | 7t-5V | 63k | Buffer (2x drive) |
| buf_1 | 7t-5V | 60k | Buffer |
| latq_1 | 7t-5V | 55k | Latch (level-sensitive) |
| mux2_2 | 7t-5V | 53k | 2-input multiplexer (2x drive) |
| dlyb_1 | 7t-5V | 48k | Delay buffer |
| nand3_1 | 7t-5V | 38k | 3-input NAND gate |
| buf_4 | 7t-5V | 34k | Buffer (4x drive) |

Across the reticle there are 329k 2-input NAND gates and 178k flip-flops — 1.8 NAND2 gates per flip-flop.

## SRAM Block Usage

SRAM (Static Random-Access Memory) blocks are pre-designed memory macros. Unlike standard cells, which are composed by automated tools, SRAM blocks are hand-optimized fixed-size units designed to store data as densely as possible.

14 of the 30 designs include SRAM, holding 79 KiB of memory between them:

| Design | SRAM macros | SRAM bits | SRAM area | Logic SC | Project |
|---|---|---|---|---|---|
| [RBOY](https://github.com/wren6991/riscboy-180) | 30 | 118,784 | 6.16 mm² (43% of core) | 70k | RISCBoy-180 |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | 28 | 106,496 | 5.61 mm² (39% of core) | 43k | BreakingTTAPs |
| [GD03](https://github.com/gregdavill/gf180mcu-racquet/) | 23 | 94,208 | 4.82 mm² (34% of core) | 78k | Racquet r2p0 - 23 core SoC |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | 21 | 86,016 | 4.40 mm² (31% of core) | 89k | KianV: A 32-bit RISC-V Linux SoC taped out on GF180MCU |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 20 | 81,920 | 4.19 mm² (29% of core) | 101k | FazyRV Hachure |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | 9 | 36,864 | 1.88 mm² (34% of core) | 35k | Racquet Half r1p0 (1/2 slot) |
| [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) | 8 | 24,576 | 0.66 mm² (5% of core) | 34k | openframe_caravel_picorv32 |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | 8 | 24,064 | 1.41 mm² (10% of core) | 58k | TillitisZedulo-testchip2025 |
| [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) | 6 | 24,576 | 1.26 mm² (21% of core) | 36k | Racquet Wide 1x0.5 |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 6 | 24,576 | 1.26 mm² (9% of core) | 204k | FABulous FPGA |
| [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) | 4 | 16,384 | 0.39 mm² (7% of core) | 122 | ocd_sram_test |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | 1 | 4,096 | 0.21 mm² (9% of core) | 36k | TinyQV - Crowdsourced Risc-V SoC |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | 1 | 4,096 | 0.21 mm² (4% of core) | 35k | TinyQV - Crowdsourced Risc-V SoC (0.5x1) |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 1 | 4,096 | 0.21 mm² (4% of core) | 36k | TinyQV - Crowdsourced Risc-V SoC (1x0.5) |

SRAM macros are identified by cell name, and their area is the macro footprint. "custom" marks a design with SRAM marker shapes (GDS 108/5) but no recognised macro, where the count and size are not known and the area is that of the marked bitcell arrays.

## SRAM vs Standard Cell Transistor Density

"Transistor density" here counts the number of distinct regions where a gate electrode (polysilicon, GDS 30/0) crosses an active area (diffusion, GDS 22/0) — each such crossing forms one transistor.

### Theoretical Maximum Transistor Density for Standard Cells

| Cell (7t-5V) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| inv_1 | 2.24 um | 114k | 2 | 228k/mm² |
| nand2_1 | 2.80 um | 91k | 4 | 364k/mm² |
| buf_1 | 3.36 um | 76k | 4 | 304k/mm² |
| dffq_1 | 16.24 um | 16k | 24 | 377k/mm² |

| Cell (9t-5V) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| inv_1 | 2.24 um | 89k | 2 | 177k/mm² |
| nand2_1 | 2.80 um | 71k | 4 | 283k/mm² |
| buf_1 | 3.36 um | 59k | 4 | 236k/mm² |
| dffq_1 | 15.68 um | 13k | 24 | 304k/mm² |

| Cell (7t-3.3V) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| inv_2 | 2.24 um | 114k | 4 | 456k/mm² |
| nand2_2 | 3.92 um | 65k | 8 | 521k/mm² |
| buff_2 | 3.36 um | 76k | 6 | 456k/mm² |
| dfxtp_2 | 15.12 um | 17k | 26 | 439k/mm² |

### SRAM Macros

| Macro | Size | Trans/mm² | % of flip-flop max | Placements |
|---|---|---|---|---|
| `gf180mcu_ocd_ip_sram__sram1024x8m8wm1` | 301 x 516 um | 385k/mm² | 88% | 2 |
| `gf180mcu_ocd_ip_sram__sram512x8m8wm1` | 301 x 322 um | 332k/mm² | 76% | 6 |
| `gf180mcu_ocd_ip_sram__sram256x8m8wm1` | 301 x 225 um | 270k/mm² | 62% | 8 |
| `gf180mcu_fd_ip_sram__sram512x8m8wm1` | 432 x 485 um | 154k/mm² | 35% | 181 |
| `gf180mcu_fd_ip_sram__sram256x8m8wm1` | 432 x 341 um | 124k/mm² | 28% | 12 |
| `gf180mcu_fd_ip_sram__sram128x8m8wm1` | 432 x 269 um | 98k/mm² | 22% | 2 |
| `gf180mcu_fd_ip_sram__sram64x8m8wm1` | 432 x 233 um | 79k/mm² | 18% | 2 |

The macro density includes the peripheral circuits (address decoders, sense amplifiers, I/O drivers) around the bitcell array, which is why larger macros of a family are denser than smaller ones.

### Best Standard Cell Regions

| Design | Peak 1mm² Trans/mm² | % of flip-flop max | Library |
|---|---|---|---|
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | 305k/mm² | 69% | 7t-5V |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 297k/mm² | 68% | mixed |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | 297k/mm² | 68% | mixed |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | 296k/mm² | 67% | 7t-5V |
| [2975](https://github.com/ThorbenMoos/Cloneless1) | 292k/mm² | 67% | 7t-5V |
| [RZML](https://gitlab.com/rejunity/ws0-lgn-fxnist-gf180mcu-tapeout) | 268k/mm² | 61% | 7t-5V |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | 258k/mm² | 59% | 7t-5V |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | 252k/mm² | 57% | 7t-5V |

Infrastructure cells are excluded from logic cell counts but their transistors (decoupling capacitors in particular) are included in transistor counts.

## Key Findings

1. The densest logic standard cell design, [2975](https://github.com/ThorbenMoos/Cloneless1) (Cloneless1), achieves **22k logic SC/mm²** averaged over its core (29% of buffer max), with a peak of **31k logic SC/mm²** in its densest 1mm² region.

2. Standard cell libraries in use: **7t-5V** (78% of logic cells), **9t-5V** (21% of logic cells), **7t-3.3V** (2% of logic cells).

3. The median digital design achieves **6k logic SC/mm²** over its core. 7 of 26 designs exceed 10k logic SC/mm².

4. The best standard cell region reaches **305k transistors/mm²** ([MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga)); the most used SRAM macro, `gf180mcu_fd_ip_sram__sram512x8m8wm1`, is 154k transistors/mm².

5. Infrastructure cells (fillers, taps, antenna diodes, ties) outnumber logic cells **2.8 to 1** across the reticle (6.0M vs 2.1M). Any density analysis must exclude these to avoid dramatically overstating actual logic content.

6. The most common logic cell is **nand2_1** (228k instances in 7t-5V).

## Per-Design Details

| Design | Cell | Die (mm) | Core mm² | Placements | Pads | Logic SC | Infra SC | Transistors | SRAM | Libraries |
|---|---|---|---|---|---|---|---|---|---|---|
| [2975](https://github.com/ThorbenMoos/Cloneless1) | `2975_chip_top_0_6` | 3.93 x 5.12 | 14.3 | 2 | 33 | 316,440 | 463,577 | 3,615,126 | 0 | mcu7t5v0: 316,440 |
| [AS03](https://github.com/AvalonSemiconductors/ws-submission-2025/) | `AS03_chip_top_6_0` | 3.93 x 5.12 | 14.3 | 1 | 75 | 86,629 | 302,626 | 2,446,849 | 0 | mcu7t5v0: 84,259, mcu9t5v0: 2,370 |
| BRWN | `BRWN_ENGN2912E_TOP_8_2` | 3.93 x 5.12 | 14.3 | 1 | 75 | 4,379 | 64,895 | 821,902 | 0 | mcu7t5v0: 4,379 |
| [BTAP](https://github.com/polyfractal/BreakingTTAPs) | `BTAP_chip_top_0_0` | 3.93 x 5.12 | 14.3 | 2 | 75 | 43,225 | 156,483 | 2,180,953 | 28 | mcu9t5v0: 43,225 |
| [CAFE](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) | `CAFE_chip_top_12_0` | 3.93 x 5.12 | 14.3 | 1 | 75 | 100,546 | 266,996 | 2,934,001 | 20 | mcu7t5v0: 100,546 |
| [CHES](https://github.com/Ravenslofty/gf180mcu-chess) | `CHES_chip_top_10_4` | 3.93 x 5.12 | 14.3 | 1 | 75 | 145,076 | 406,519 | 2,716,746 | 0 | mcu9t5v0: 145,076 |
| [GD02](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) | `GD02_chip_top_14_4` | 1.94 x 5.12 | 5.5 | 1 | 73 | 34,564 | 78,256 | 976,848 | 9 | mcu7t5v0: 34,564 |
| [GD03](https://github.com/gregdavill/gf180mcu-racquet/) | `GD03_chip_top_6_6` | 3.93 x 5.12 | 14.3 | 1 | 75 | 78,208 | 241,732 | 2,744,447 | 23 | mcu7t5v0: 78,208 |
| [GD04](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) | `GD04_chip_top_6_8` | 3.93 x 2.53 | 5.9 | 2 | 73 | 35,525 | 104,165 | 1,002,605 | 6 | mcu9t5v0: 35,525 |
| [HZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu) | `HZ80_chip_top_14_0` | 1.94 x 5.12 | 5.5 | 1 | 73 | 5,143 | 80,093 | 831,740 | 0 | mcu9t5v0: 5,143 |
| [ISHI](https://github.com/ishi-kai/ISHI-KAI_Multiple_Projects_WaferSapce-GF180-1) | `ISHI_ISHI-KAI_WS_RUN1_12_4` | 3.93 x 5.12 | 14.3 | 1 | 196 | 0 | 63 | 227,230 | 0 | — |
| [JKU1](https://github.com/iic-jku/gf180mcu-jku-projects) | `JKU1_chip_top_10_0` | 3.93 x 5.12 | 14.3 | 1 | 75 | 174,469 | 395,678 | 3,154,664 | 0 | mcu7t5v0: 174,469 |
| [JKU2](https://github.com/iic-jku/gf180mcu-jku-atbs-adc) | `JKU2_chip_top_0_8` | 3.93 x 2.53 | 5.9 | 1 | 73 | 22,476 | 118,209 | 1,001,897 | 0 | mcu9t5v0: 22,471, mcu7t5v0: 5 |
| [KIAN](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32/) | `KIAN_chip_top_8_0` | 3.93 x 5.12 | 14.3 | 1 | 75 | 88,941 | 246,524 | 2,456,450 | 21 | mcu9t5v0: 88,941 |
| [MOLE](https://github.com/mole99/gf180mcu-fabulous-fpga) | `MOLE_chip_top_8_4` | 3.93 x 5.12 | 14.3 | 1 | 75 | 203,757 | 295,366 | 3,418,507 | 6 | mcu7t5v0: 203,757 |
| [MOS2](https://github.com/AutoMOS-project/AutoMOS-chipathon2025/tree/update-for-ws) | `MOS2_chip_top_10_6` | 3.93 x 5.12 | 14.3 | 1 | 163 | 0 | 52 | 240,673 | 0 | — |
| MOSB | `MOSB_chip_top_4_0` | 3.93 x 5.12 | 14.3 | 2 | 75 | 17,889 | 8,134 | 432,098 | 0 | mcu9t5v0: 17,889 |
| [OCD1](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) | `OCD1_caravel_openframe_top_8_6` | 3.93 x 5.12 | 14.3 | 1 | 64 | 34,431 | 524,019 | 1,528,880 | 8 | mcu7t3v3: 34,429, mcu7t5v0: 2 |
| [OCD2](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) | `OCD2_gf180mcu_ocd_sram_top_2_8` | 3.93 x 2.53 | 5.9 | 2 | 73 | 122 | 445 | 250,621 | 4 | mcu7t3v3: 120, mcu7t5v0: 2 |
| [RBOY](https://github.com/wren6991/riscboy-180) | `RBOY_chip_top_12_6` | 3.93 x 5.12 | 14.3 | 1 | 75 | 69,949 | 179,358 | 2,395,590 | 30 | mcu9t5v0: 69,949 |
| [RZ80](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file) | `RZ80_chip_top_0_2` | 3.93 x 5.12 | 14.3 | 2 | 75 | 5,209 | 208,620 | 2,307,517 | 0 | mcu9t5v0: 5,209 |
| [RZML](https://gitlab.com/rejunity/ws0-lgn-fxnist-gf180mcu-tapeout) | `RZML_chip_top_12_2` | 3.93 x 5.12 | 14.3 | 1 | 75 | 88,407 | 434,355 | 3,299,354 | 0 | mcu7t5v0: 88,407 |
| [TQVA](https://github.com/MichaelBell/ws01-tinyQV) | `TQVA_chip_top_14_8` | 1.94 x 2.53 | 2.3 | 1 | 57 | 35,711 | 62,585 | 480,963 | 1 | mcu7t5v0: 35,711 |
| [TQVB](https://github.com/MichaelBell/ws01-tinyQV) | `TQVB_chip_top_14_6` | 1.94 x 5.12 | 5.5 | 1 | 73 | 35,416 | 123,968 | 1,098,008 | 1 | mcu7t5v0: 35,416 |
| [TQVC](https://github.com/MichaelBell/ws01-tinyQV) | `TQVC_chip_top_8_8` | 3.93 x 2.53 | 5.9 | 2 | 73 | 36,116 | 137,094 | 1,219,676 | 1 | mcu7t5v0: 36,116 |
| [TRID](https://github.com/Scafir/gf180mcu-project-trident-gf180-teststructure) | `TRID_TOP_14_2` | 1.94 x 5.12 | 5.5 | 1 | 95 | 0 | 0 | 102,336 | 0 | — |
| [TTP2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | `TTP2_tt_gf_wrapper_6_4` | 3.93 x 5.12 | 14.3 | 1 | 75 | 203,781 | 366,289 | 3,274,885 | 0 | mcu7t5v0: 200,156, mcu9t5v0: 3,625 |
| [TTPG](https://github.com/TinyTapeout/tinytapeout-gf-0p2) | `TTPG_tt_gf_wrapper_6_2` | 3.93 x 5.12 | 14.3 | 1 | 75 | 203,780 | 366,311 | 3,291,757 | 0 | mcu7t5v0: 200,155, mcu9t5v0: 3,625 |
| [TZ01](https://github.com/ZeduloTech/gf180mcu-testchip2025) | `TZ01_chip_top_0_4` | 3.93 x 5.12 | 14.3 | 2 | 75 | 58,018 | 228,360 | 2,034,655 | 8 | mcu7t5v0: 58,018 |
| [WSLG](https://github.com/89Mods/ws-logo-die) | `WSLG_chip_top_10_2` | 3.93 x 5.12 | 14.3 | 1 | 75 | 14,290 | 145,520 | 1,521,509 | 0 | mcu7t5v0: 14,290 |

## Methodology

- **Logic cell counts** come from walking the layout hierarchy and counting instances of every cell whose name contains a standard cell library prefix, excluding types starting with `fill`, `endcap`, `filltie`, `fillcap`, `tap`, `antenna`, `diode`, `tiel`, `tieh`.
- **Transistor counts** are the number of merged polygons in the boolean AND of the diffusion (22/0) and gate polysilicon (30/0) layers.
- **Core area** is (die width − 0.70mm) x (die height − 0.70mm), removing a 350um pad ring from each side.
- **Cell dimensions** are the width and height of each standard cell's placement boundary (GDS 0/0), measured from the cells present in this layout.
- **Theoretical maximum** = (1000um / cell width) x (1000um / row height).
- **Peak figures** are the best single cell of a 1mm x 1mm grid laid over each design, skipping grid cells that overlap an SRAM macro. Grid cells at the top and right edges of a die are smaller than 1mm², so peaks are lower bounds.
- **SRAM macros** are counted by cell name. The `sram_block_count` column of the summary CSV is kept for comparison with earlier results; it counts SramCore marker shapes, of which each GF180MCU macro has two.
- Designs placed more than once on the reticle are counted once.

### Difference from the March 2026 Run 1 report

The first version of the Run 1 report measured cell width and row height from each cell's overall bounding box. That box includes n-well and implant shapes which deliberately overhang the cell and overlap its neighbours, so it is larger than the area a placed cell occupies: 4.22 x 4.78um instead of 3.36 x 3.92um for a 7-track buffer. Theoretical maximum densities in that version were therefore about 35% too low, and every "% of max" figure correspondingly too high. This report uses the placement boundary. It also reported SRAM "blocks" by counting SramCore marker shapes, which gave twice the number of macros. Logic cell counts, transistor counts and achieved densities are unchanged.

---

*Generated by [ws-run-reports](https://github.com/wafer-space/ws-run-reports) from `G801.oas` (md5 `3ae7349e205f60d9f997cf7d3a688500`) in [wafer-space/ws-run1](https://github.com/wafer-space/ws-run1). Analysis method: KLayout boolean geometry operations on GDS layers. Grid resolution: 1mm x 1mm. Density figures are rounded to the nearest 1k.*
