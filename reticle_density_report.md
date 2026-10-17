# wafer.space GF180MCU Run 1 — Standard Cell & SRAM Density Report

**GF180MCU Process (GlobalFoundries 180nm), Shuttle G801**

## Introduction

This report analyzes the standard cell and SRAM density achieved by the 30 unique public chip designs on the wafer.space GF180MCU Run 1 reticle. The reticle has 40 slots; the public layout contains 38 slot placements (some designs appear more than once, and private designs are not included).

All designs were fabricated on GlobalFoundries' GF180MCU process, a 180-nanometer (0.18um) technology node. This is a mature, relatively large-geometry process — for comparison, modern smartphone chips use 3nm or 5nm processes with features roughly 50x smaller.

> **Note on counting methodology:** All standard cell counts in this report count only **logic cells** — cells that perform actual computation (gates, flip-flops, buffers, multiplexers, etc.). Infrastructure cells are excluded: filler cells (fill, fillcap, endcap, filltie), well taps, antenna fix diodes, ESD diodes, and tie-high/tie-low cells. These infrastructure cells are inserted by automated tools to satisfy manufacturing rules but perform no logic function. On this reticle there are 6.0M infrastructure cell instances and 2.1M logic cell instances across the unique designs — 2.8 infrastructure cells for every logic cell.

## What Are Standard Cells?

A "standard cell" is a pre-designed, pre-verified building block used to construct digital circuits. Think of them like LEGO bricks for chip design: each cell performs one simple logic function (an AND gate, a flip-flop for storing one bit, a buffer for boosting signal strength), and a chip designer assembles thousands or millions of them to build complex circuits.

Standard cells in a library all share the same height (so they line up in rows) but vary in width depending on their function. Automated tools place these cells in rows and then route wires between them.

The "density" of standard cells — how many fit per square millimeter — is a key measure of how efficiently a design uses its silicon area. Higher density generally means more logic functionality packed into less chip area, which reduces cost.

## Standard Cell Libraries on This Reticle

| Library | Row Height | Rows per mm | Relative Density | Logic instances | Share |
|---|---|---|---|---|---|
| [mcu7t5v0 (7-track, 5V)](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 3.92 um | 255 rows | 100% | 1.7M | 77% |
| [mcu9t5v0 (9-track, 5V)](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 5.04 um | 198 rows | 78% | 443k | 21% |
| [as_sc_mcu7t3v3 (AS 7-track, 3.3V)](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 3.92 um | 255 rows | 100% | 35k | 2% |
| [as_ex_mcu7t5v0 (AS extra 7-track, 5V)](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0) | 3.92 um | 255 rows | 100% | 5k | <1% |

Row height is the height of the cells' placement boundary, which is what rows are stacked at. Taller rows hold fewer cells per mm² but leave more room for wiring inside the cell.

Most designs use one library exclusively. The designs that mix libraries are: [AS03](https://wafer.space/ws-run1/projects/AS03.html) (81k [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) + 4k [AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0) + 2k [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html)); [OCD2](https://wafer.space/ws-run1/projects/OCD2.html) (120 [AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) + 2 [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html)); [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) (200k [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) + 4k [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html)); [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) (200k [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) + 4k [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html)); [WSLG](https://wafer.space/ws-run1/projects/WSLG.html) (13k [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) + 2k [AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0)).

## Theoretical Maximum Standard Cell Density

If you filled an entire square millimeter with nothing but one type of logic standard cell (no wiring, no gaps, no infrastructure cells), the theoretical maximum density would be:

| Cell Type | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | [AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | [AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0) | What it does |
|---|---|---|---|---|---|
| Inverter | 114k/mm² ([`inv_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/inv/gf180mcu_fd_sc_mcu7t5v0__inv_1.html), 2.24um) | 89k/mm² ([`inv_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/inv/gf180mcu_fd_sc_mcu9t5v0__inv_1.html), 2.24um) | 114k/mm² ([`inv_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3), 2.24um) | — | Flips a signal |
| NAND gate | 91k/mm² ([`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nand2/gf180mcu_fd_sc_mcu7t5v0__nand2_1.html), 2.80um) | 71k/mm² ([`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/nand2/gf180mcu_fd_sc_mcu9t5v0__nand2_1.html), 2.80um) | 65k/mm² ([`nand2_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3), 3.92um) | — | Basic logic gate |
| Buffer | 76k/mm² ([`buf_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/buf/gf180mcu_fd_sc_mcu7t5v0__buf_1.html), 3.36um) | 59k/mm² ([`buf_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/buf/gf180mcu_fd_sc_mcu9t5v0__buf_1.html), 3.36um) | 76k/mm² ([`buff_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3), 3.36um) | — | Strengthens a signal |
| Flip-flop | 16k/mm² ([`dffq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/dffq/gf180mcu_fd_sc_mcu7t5v0__dffq_1.html), 16.24um) | 13k/mm² ([`dffq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/dffq/gf180mcu_fd_sc_mcu9t5v0__dffq_1.html), 15.68um) | 17k/mm² ([`dfxtp_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3), 15.12um) | 14k/mm² ([`dfxtp_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0), 18.48um) | Stores one bit |

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
| [2975](https://wafer.space/ws-run1/projects/2975.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 22k | 29% | 50% | 316k | 0 | [Cloneless1](https://github.com/ThorbenMoos/Cloneless1) |
| [TQVA](https://wafer.space/ws-run1/projects/TQVA.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 16k | 21% | 36% | 36k | 1 | [TinyQV - Crowdsourced Risc-V SoC](https://github.com/MichaelBell/ws01-tinyQV) |
| [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) | mixed | 14k | 19% | 42% | 204k | 0 | [Tiny Tapeout GF 0.2](https://github.com/TinyTapeout/tinytapeout-gf-0p2) |
| [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) | mixed | 14k | 19% | 42% | 204k | 0 | [Tiny Tapeout GF 0p2 - Power Gated Variant](https://github.com/TinyTapeout/tinytapeout-gf-0p2) |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 14k | 19% | 45% | 204k | 6 | [FABulous FPGA](https://github.com/mole99/gf180mcu-fabulous-fpga) |
| [JKU1](https://wafer.space/ws-run1/projects/JKU1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 12k | 16% | 26% | 174k | 0 | [gf180mcu-jku-projects](https://github.com/iic-jku/gf180mcu-jku-projects) |
| [CHES](https://wafer.space/ws-run1/projects/CHES.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 10k | 17% | 31% | 145k | 0 | [chess-move-generator](https://github.com/Ravenslofty/gf180mcu-chess) |

### Medium Density (3k–10k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Cell area | Logic SC | SRAM | Project |
|---|---|---|---|---|---|---|---|
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 7k | 9% | 24% | 101k | 20 | [FazyRV Hachure](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 6k | 9% | 15% | 35k | 1 | [TinyQV - Crowdsourced Risc-V SoC (0.5x1)](https://github.com/MichaelBell/ws01-tinyQV) |
| [GD02](https://wafer.space/ws-run1/projects/GD02.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 6k | 8% | 17% | 35k | 9 | [Racquet Half r1p0 (1/2 slot)](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) |
| [KIAN](https://wafer.space/ws-run1/projects/KIAN.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 6k | 11% | 22% | 89k | 21 | [KianV: A 32-bit RISC-V Linux SoC taped out on GF180MCU](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32) |
| [RZML](https://wafer.space/ws-run1/projects/RZML.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 6k | 8% | 20% | 88k | 0 | [LGN FashionMNIST - Logic Gate Network trained on FashioMNIST](https://gitlab.com/rejunity/ws0-lgn-fxnist-gf180mcu-tapeout) |
| [TQVC](https://wafer.space/ws-run1/projects/TQVC.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 6k | 8% | 14% | 36k | 1 | [TinyQV - Crowdsourced Risc-V SoC (1x0.5)](https://github.com/MichaelBell/ws01-tinyQV) |
| [AS03](https://wafer.space/ws-run1/projects/AS03.html) | mixed | 6k | 8% | 17% | 87k | 0 | [WS-Multi](https://github.com/AvalonSemiconductors/ws-submission-2025) |
| [GD04](https://wafer.space/ws-run1/projects/GD04.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 6k | 10% | 24% | 36k | 6 | [Racquet Wide 1x0.5](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) |
| [GD03](https://wafer.space/ws-run1/projects/GD03.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 5k | 7% | 15% | 78k | 23 | [Racquet r2p0 - 23 core SoC](https://github.com/gregdavill/gf180mcu-racquet) |
| [RBOY](https://wafer.space/ws-run1/projects/RBOY.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 5k | 8% | 21% | 70k | 30 | [RISCBoy-180](https://github.com/wren6991/riscboy-180) |
| [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 4k | 5% | 12% | 58k | 8 | [TillitisZedulo-testchip2025](https://github.com/ZeduloTech/gf180mcu-testchip2025) |
| [JKU2](https://wafer.space/ws-run1/projects/JKU2.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 4k | 6% | 16% | 22k | 0 | [gf180mcu-jku-atbs-adc](https://github.com/iic-jku/gf180mcu-jku-atbs-adc) |
| [BTAP](https://wafer.space/ws-run1/projects/BTAP.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 3k | 5% | 9% | 43k | 28 | [BreakingTTAPs](https://github.com/polyfractal/BreakingTTAPs) |

### Low Density (below 3k logic SC/mm² core average)

| Design | Library | Core SC/mm² | % of max | Cell area | Logic SC | SRAM | Project |
|---|---|---|---|---|---|---|---|
| [OCD1](https://wafer.space/ws-run1/projects/OCD1.html) | [AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 2k | 3% | 7% | 34k | 8 | [openframe_caravel_picorv32](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) |
| [MOSB](https://wafer.space/ws-run1/projects/MOSB.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 1k | 2% | 4% | 18k | 0 | MOSbiusV3 |
| [WSLG](https://wafer.space/ws-run1/projects/WSLG.html) | mixed | 1k | 1% | 4% | 14k | 0 | [Wafer.Space Logo](https://github.com/89Mods/ws-logo-die) |
| [HZ80](https://wafer.space/ws-run1/projects/HZ80.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 1k | 2% | 3% | 5k | 0 | [FOSSi open-source replacement for Z80 classic 8-bit CPU (0.5 x 1 slot)](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu) |
| [RZ80](https://wafer.space/ws-run1/projects/RZ80.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | <1k | 1% | 1% | 5k | 0 | [FOSSi open-source replacement for Z80 classic 8-bit CPU](https://github.com/rejunity/ws0-z80-open-silicon-gf180mcu?tab=readme-ov-file) |
| [BRWN](https://wafer.space/ws-run1/projects/BRWN.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | <1k | <1% | 1% | 4k | 0 | FA25_Engn2912e_Saligane_Brown |

### Minimal (analog, custom or test structures)

These designs contain fewer than 1,000 logic standard cells:

| Design | Logic SC | Transistors | SRAM | Pads | Project |
|---|---|---|---|---|---|
| [ISHI](https://wafer.space/ws-run1/projects/ISHI.html) | 0 | 58k | 0 | 195 | [ISHI-KAI's Multiple Users Project](https://github.com/ishi-kai/ISHI-KAI_Multiple_Projects_WaferSapce-GF180-1) |
| [MOS2](https://wafer.space/ws-run1/projects/MOS2.html) | 0 | 80k | 0 | 162 | [AutoMOS-Chipathon-2025 full size](https://github.com/AutoMOS-project/AutoMOS-chipathon2025/tree/update-for-ws) |
| [OCD2](https://wafer.space/ws-run1/projects/OCD2.html) | 122 | 169k | 4 | 72 | [ocd_sram_test](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) |
| [TRID](https://wafer.space/ws-run1/projects/TRID.html) | 0 | 20k | 0 | 94 | [gf180mcu-project-trident-gf180-teststructure](https://github.com/Scafir/gf180mcu-project-trident-gf180-teststructure) |

## Achieved Density — Peak 1mm x 1mm Regions

While the averages above include sparse regions, the densest 1mm x 1mm square found anywhere on a design shows the highest density it achieved. The square slides over the die in 100um steps and may not touch an SRAM macro.

| Design | Peak Logic SC/mm² | % of buffer max | Library |
|---|---|---|---|
| [JKU1](https://wafer.space/ws-run1/projects/JKU1.html) | 40k | 52% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [2975](https://wafer.space/ws-run1/projects/2975.html) | 32k | 42% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | 27k | 36% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) | 26k | 34% of 76k | mixed |
| [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) | 26k | 34% of 76k | mixed |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | 24k | 31% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [TQVA](https://wafer.space/ws-run1/projects/TQVA.html) | 23k | 30% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | 21k | 28% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [AS03](https://wafer.space/ws-run1/projects/AS03.html) | 21k | 28% of 76k | mixed |
| [BTAP](https://wafer.space/ws-run1/projects/BTAP.html) | 21k | 35% of 59k | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) |
| [GD04](https://wafer.space/ws-run1/projects/GD04.html) | 18k | 31% of 59k | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) |
| [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) | 18k | 24% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [TQVC](https://wafer.space/ws-run1/projects/TQVC.html) | 16k | 21% of 76k | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [RBOY](https://wafer.space/ws-run1/projects/RBOY.html) | 14k | 23% of 59k | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) |
| [KIAN](https://wafer.space/ws-run1/projects/KIAN.html) | 13k | 22% of 59k | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) |

The highest achieved density on this reticle is 52% of the buffer theoretical maximum, observed in the densest 1mm² region of [JKU1](https://wafer.space/ws-run1/projects/JKU1.html). The rest of that area is consumed by larger cells, infrastructure cells and the gaps left for routing.

## Library Comparison

Comparing designs that use one library exclusively:

| Metric | [mcu7t5v0 (7-track, 5V)](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | [mcu9t5v0 (9-track, 5V)](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | [as_sc_mcu7t3v3 (AS 7-track, 3.3V)](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) |
|---|---|---|---|
| Designs using this library | 12 | 9 | 1 |
| Best core density | 22k SC/mm² · 29% of max ([2975](https://wafer.space/ws-run1/projects/2975.html)) | 10k SC/mm² · 17% of max ([CHES](https://wafer.space/ws-run1/projects/CHES.html)) | 2k SC/mm² · 3% of max ([OCD1](https://wafer.space/ws-run1/projects/OCD1.html)) |
| Best peak grid cell | 40k SC/mm² · 52% of max ([JKU1](https://wafer.space/ws-run1/projects/JKU1.html)) | 21k SC/mm² · 35% of max ([BTAP](https://wafer.space/ws-run1/projects/BTAP.html)) | 10k SC/mm² · 14% of max ([OCD1](https://wafer.space/ws-run1/projects/OCD1.html)) |
| Median core density | 6k SC/mm² · 8% of max | 4k SC/mm² · 6% of max | 2k SC/mm² · 3% of max |

Differences between libraries here reflect which designs chose which library as much as the libraries themselves; the theoretical difference from row height alone is in the table above.

## Most Common Logic Cell Types

The 15 most-used logic cell types across all unique designs on the reticle:

| Cell Type | Library | Instances | What it does |
|---|---|---|---|
| [`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nand2/gf180mcu_fd_sc_mcu7t5v0__nand2_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 228k | 2-input NAND gate |
| [`nor2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nor2/gf180mcu_fd_sc_mcu7t5v0__nor2_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 99k | 2-input NOR gate |
| [`oai21_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/oai21/gf180mcu_fd_sc_mcu7t5v0__oai21_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 94k | OR-AND-Invert compound gate |
| [`dffq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/dffq/gf180mcu_fd_sc_mcu7t5v0__dffq_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 87k | D flip-flop (1 bit storage) |
| [`aoi21_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/aoi21/gf180mcu_fd_sc_mcu7t5v0__aoi21_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 81k | AND-OR-Invert compound gate |
| [`xor2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/xor2/gf180mcu_fd_sc_mcu7t5v0__xor2_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 81k | 2-input XOR gate |
| [`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/nand2/gf180mcu_fd_sc_mcu9t5v0__nand2_1.html) | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html) | 76k | 2-input NAND gate |
| [`clkinv_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/clkinv/gf180mcu_fd_sc_mcu7t5v0__clkinv_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 76k | Clock inverter |
| [`buf_2`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/buf/gf180mcu_fd_sc_mcu7t5v0__buf_2.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 63k | Buffer (2x drive) |
| [`buf_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/buf/gf180mcu_fd_sc_mcu7t5v0__buf_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 60k | Buffer |
| [`latq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/latq/gf180mcu_fd_sc_mcu7t5v0__latq_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 55k | Latch (level-sensitive) |
| [`mux2_2`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/mux2/gf180mcu_fd_sc_mcu7t5v0__mux2_2.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 53k | 2-input multiplexer (2x drive) |
| [`dlyb_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/dlyb/gf180mcu_fd_sc_mcu7t5v0__dlyb_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 48k | Delay buffer |
| [`nand3_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nand3/gf180mcu_fd_sc_mcu7t5v0__nand3_1.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 38k | 3-input NAND gate |
| [`buf_4`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/buf/gf180mcu_fd_sc_mcu7t5v0__buf_4.html) | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) | 34k | Buffer (4x drive) |

Across the reticle there are 329k 2-input NAND gates and 178k flip-flops — 1.8 NAND2 gates per flip-flop.

## SRAM Block Usage

SRAM (Static Random-Access Memory) blocks are pre-designed memory macros. Unlike standard cells, which are composed by automated tools, SRAM blocks are hand-optimized fixed-size units designed to store data as densely as possible.

14 of the 30 designs include SRAM, holding 79 KiB of memory between them:

| Design | SRAM macros | SRAM bits | SRAM area | Logic SC | Project |
|---|---|---|---|---|---|
| [RBOY](https://wafer.space/ws-run1/projects/RBOY.html) | 30 | 118,784 | 6.16 mm² (43% of core) | 70k | [RISCBoy-180](https://github.com/wren6991/riscboy-180) |
| [BTAP](https://wafer.space/ws-run1/projects/BTAP.html) | 28 | 106,496 | 5.61 mm² (39% of core) | 43k | [BreakingTTAPs](https://github.com/polyfractal/BreakingTTAPs) |
| [GD03](https://wafer.space/ws-run1/projects/GD03.html) | 23 | 94,208 | 4.82 mm² (34% of core) | 78k | [Racquet r2p0 - 23 core SoC](https://github.com/gregdavill/gf180mcu-racquet) |
| [KIAN](https://wafer.space/ws-run1/projects/KIAN.html) | 21 | 86,016 | 4.40 mm² (31% of core) | 89k | [KianV: A 32-bit RISC-V Linux SoC taped out on GF180MCU](https://github.com/splinedrive/gf180mcu-kianv-rv32ima-sv32) |
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | 20 | 81,920 | 4.19 mm² (29% of core) | 101k | [FazyRV Hachure](https://github.com/meiniKi/gf180mcu-fazyrv-hachure) |
| [GD02](https://wafer.space/ws-run1/projects/GD02.html) | 9 | 36,864 | 1.88 mm² (34% of core) | 35k | [Racquet Half r1p0 (1/2 slot)](https://github.com/gregdavill/gf180mcu-racquet-0.5x1) |
| [OCD1](https://wafer.space/ws-run1/projects/OCD1.html) | 8 | 24,576 | 0.66 mm² (5% of core) | 34k | [openframe_caravel_picorv32](https://github.com/RTimothyEdwards/gf180mcu_ocd_openframe) |
| [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) | 8 | 24,064 | 1.41 mm² (10% of core) | 58k | [TillitisZedulo-testchip2025](https://github.com/ZeduloTech/gf180mcu-testchip2025) |
| [GD04](https://wafer.space/ws-run1/projects/GD04.html) | 6 | 24,576 | 1.26 mm² (21% of core) | 36k | [Racquet Wide 1x0.5](https://github.com/gregdavill/gf180mcu-racquet-1x0.5) |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | 6 | 24,576 | 1.26 mm² (9% of core) | 204k | [FABulous FPGA](https://github.com/mole99/gf180mcu-fabulous-fpga) |
| [OCD2](https://wafer.space/ws-run1/projects/OCD2.html) | 4 | 16,384 | 0.39 mm² (7% of core) | 122 | [ocd_sram_test](https://github.com/RTimothyEdwards/gf180mcu_ocd_sram_test) |
| [TQVA](https://wafer.space/ws-run1/projects/TQVA.html) | 1 | 4,096 | 0.21 mm² (9% of core) | 36k | [TinyQV - Crowdsourced Risc-V SoC](https://github.com/MichaelBell/ws01-tinyQV) |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | 1 | 4,096 | 0.21 mm² (4% of core) | 35k | [TinyQV - Crowdsourced Risc-V SoC (0.5x1)](https://github.com/MichaelBell/ws01-tinyQV) |
| [TQVC](https://wafer.space/ws-run1/projects/TQVC.html) | 1 | 4,096 | 0.21 mm² (4% of core) | 36k | [TinyQV - Crowdsourced Risc-V SoC (1x0.5)](https://github.com/MichaelBell/ws01-tinyQV) |

SRAM macros are identified by cell name, and their area is the macro footprint. "custom" marks a design with SRAM marker shapes ([GDS 108/5](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) but no recognised macro, where the count and size are not known and the area is that of the marked bitcell arrays.

## SRAM vs Standard Cell Transistor Density

"Transistor density" here counts the number of distinct regions where a gate electrode (polysilicon, [GDS 30/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) crosses an active area (diffusion, [GDS 22/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) — each such crossing forms one transistor.

### Theoretical Maximum Transistor Density for Standard Cells

| Cell ([7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html)) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| [`inv_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/inv/gf180mcu_fd_sc_mcu7t5v0__inv_1.html) | 2.24 um | 114k | 2 | 228k/mm² |
| [`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nand2/gf180mcu_fd_sc_mcu7t5v0__nand2_1.html) | 2.80 um | 91k | 4 | 364k/mm² |
| [`buf_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/buf/gf180mcu_fd_sc_mcu7t5v0__buf_1.html) | 3.36 um | 76k | 4 | 304k/mm² |
| [`dffq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/dffq/gf180mcu_fd_sc_mcu7t5v0__dffq_1.html) | 16.24 um | 16k | 24 | 377k/mm² |

| Cell ([9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html)) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| [`inv_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/inv/gf180mcu_fd_sc_mcu9t5v0__inv_1.html) | 2.24 um | 89k | 2 | 177k/mm² |
| [`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/nand2/gf180mcu_fd_sc_mcu9t5v0__nand2_1.html) | 2.80 um | 71k | 4 | 283k/mm² |
| [`buf_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/buf/gf180mcu_fd_sc_mcu9t5v0__buf_1.html) | 3.36 um | 59k | 4 | 236k/mm² |
| [`dffq_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/cells/dffq/gf180mcu_fd_sc_mcu9t5v0__dffq_1.html) | 15.68 um | 13k | 24 | 304k/mm² |

| Cell ([AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3)) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| [`inv_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 2.24 um | 114k | 4 | 456k/mm² |
| [`nand2_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 3.92 um | 65k | 8 | 521k/mm² |
| [`buff_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 3.36 um | 76k | 6 | 456k/mm² |
| [`dfxtp_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3) | 15.12 um | 17k | 26 | 439k/mm² |

| Cell ([AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0)) | Width | Cells/mm² | Trans/cell | Trans/mm² theoretical max |
|---|---|---|---|---|
| [`dfxtp_2`](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0) | 18.48 um | 14k | 26 | 359k/mm² |

### SRAM Macros

| Macro | Size | Trans/mm² | % of flip-flop max | Placements |
|---|---|---|---|---|
| [`gf180mcu_ocd_ip_sram__sram1024x8m8wm1`](https://github.com/RTimothyEdwards/gf180mcu_ocd_ip_sram/blob/main/cells/gf180mcu_ocd_ip_sram__sram1024x8m8wm1/gf180mcu_ocd_ip_sram__sram1024x8m8wm1.rst) | 301 x 516 um | 385k/mm² | 88% | 2 |
| [`gf180mcu_ocd_ip_sram__sram512x8m8wm1`](https://github.com/RTimothyEdwards/gf180mcu_ocd_ip_sram/blob/main/cells/gf180mcu_ocd_ip_sram__sram512x8m8wm1/gf180mcu_ocd_ip_sram__sram512x8m8wm1.rst) | 301 x 322 um | 332k/mm² | 76% | 6 |
| [`gf180mcu_ocd_ip_sram__sram256x8m8wm1`](https://github.com/RTimothyEdwards/gf180mcu_ocd_ip_sram/blob/main/cells/gf180mcu_ocd_ip_sram__sram256x8m8wm1/gf180mcu_ocd_ip_sram__sram256x8m8wm1.rst) | 301 x 225 um | 270k/mm² | 62% | 8 |
| [`gf180mcu_fd_ip_sram__sram512x8m8wm1`](https://gf180mcu-pdk.readthedocs.io/en/latest/IPs/SRAM/gf180mcu_fd_ip_sram/cells/gf180mcu_fd_ip_sram__sram512x8m8wm1/gf180mcu_fd_ip_sram__sram512x8m8wm1.html) | 432 x 485 um | 154k/mm² | 35% | 181 |
| [`gf180mcu_fd_ip_sram__sram256x8m8wm1`](https://gf180mcu-pdk.readthedocs.io/en/latest/IPs/SRAM/gf180mcu_fd_ip_sram/cells/gf180mcu_fd_ip_sram__sram256x8m8wm1/gf180mcu_fd_ip_sram__sram256x8m8wm1.html) | 432 x 341 um | 124k/mm² | 28% | 12 |
| [`gf180mcu_fd_ip_sram__sram128x8m8wm1`](https://gf180mcu-pdk.readthedocs.io/en/latest/IPs/SRAM/gf180mcu_fd_ip_sram/cells/gf180mcu_fd_ip_sram__sram128x8m8wm1/gf180mcu_fd_ip_sram__sram128x8m8wm1.html) | 432 x 269 um | 98k/mm² | 22% | 2 |
| [`gf180mcu_fd_ip_sram__sram64x8m8wm1`](https://gf180mcu-pdk.readthedocs.io/en/latest/IPs/SRAM/gf180mcu_fd_ip_sram/cells/gf180mcu_fd_ip_sram__sram64x8m8wm1/gf180mcu_fd_ip_sram__sram64x8m8wm1.html) | 432 x 233 um | 79k/mm² | 18% | 2 |

The macro density includes the peripheral circuits (address decoders, sense amplifiers, I/O drivers) around the bitcell array, which is why larger macros of a family are denser than smaller ones.

### Best Standard Cell Regions

| Design | Peak 1mm² Trans/mm² | % of flip-flop max | Library |
|---|---|---|---|
| [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) | 310k/mm² | 71% | mixed |
| [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) | 310k/mm² | 71% | mixed |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | 300k/mm² | 68% | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [JKU1](https://wafer.space/ws-run1/projects/JKU1.html) | 294k/mm² | 67% | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [2975](https://wafer.space/ws-run1/projects/2975.html) | 293k/mm² | 67% | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | 292k/mm² | 67% | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | 276k/mm² | 63% | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html) |
| [AS03](https://wafer.space/ws-run1/projects/AS03.html) | 272k/mm² | 62% | mixed |

Infrastructure cells are excluded from logic cell counts but their transistors (decoupling capacitors in particular) are included in transistor counts.

## Process Features and Voltages

Which transistor voltages and optional devices of the GF180MCU process the 30 designs use. Voltages count both the libraries a design chose (standard cells and SRAM) and transistors the designer drew. Devices count only what the designer drew: standard cells, SRAM macros, I/O pads and fill are left out, because every die has them. A single test structure counts the same as a large block.

| Transistor voltage | Designs | Which |
|---|---|---|
| 3.3 V | 8 of 30 | [BRWN](https://wafer.space/ws-run1/projects/BRWN.html), [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [MOSB](https://wafer.space/ws-run1/projects/MOSB.html), [OCD1](https://wafer.space/ws-run1/projects/OCD1.html), [OCD2](https://wafer.space/ws-run1/projects/OCD2.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html), [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) |
| 5 V | 29 of 30 | [2975](https://wafer.space/ws-run1/projects/2975.html), [AS03](https://wafer.space/ws-run1/projects/AS03.html), [BRWN](https://wafer.space/ws-run1/projects/BRWN.html), [BTAP](https://wafer.space/ws-run1/projects/BTAP.html), [CAFE](https://wafer.space/ws-run1/projects/CAFE.html), [CHES](https://wafer.space/ws-run1/projects/CHES.html), [GD02](https://wafer.space/ws-run1/projects/GD02.html), [GD03](https://wafer.space/ws-run1/projects/GD03.html), [GD04](https://wafer.space/ws-run1/projects/GD04.html), [HZ80](https://wafer.space/ws-run1/projects/HZ80.html), [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [JKU1](https://wafer.space/ws-run1/projects/JKU1.html), [JKU2](https://wafer.space/ws-run1/projects/JKU2.html), [KIAN](https://wafer.space/ws-run1/projects/KIAN.html), [MOLE](https://wafer.space/ws-run1/projects/MOLE.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [MOSB](https://wafer.space/ws-run1/projects/MOSB.html), [OCD1](https://wafer.space/ws-run1/projects/OCD1.html), [OCD2](https://wafer.space/ws-run1/projects/OCD2.html), [RBOY](https://wafer.space/ws-run1/projects/RBOY.html), [RZ80](https://wafer.space/ws-run1/projects/RZ80.html), [RZML](https://wafer.space/ws-run1/projects/RZML.html), [TQVA](https://wafer.space/ws-run1/projects/TQVA.html), [TQVB](https://wafer.space/ws-run1/projects/TQVB.html), [TQVC](https://wafer.space/ws-run1/projects/TQVC.html), [TTP2](https://wafer.space/ws-run1/projects/TTP2.html), [TTPG](https://wafer.space/ws-run1/projects/TTPG.html), [TZ01](https://wafer.space/ws-run1/projects/TZ01.html), [WSLG](https://wafer.space/ws-run1/projects/WSLG.html) |
| 6 V | 5 of 30 | [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOSB](https://wafer.space/ws-run1/projects/MOSB.html), [OCD1](https://wafer.space/ws-run1/projects/OCD1.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html), [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) |

| Device | Designs drawing it | Which |
|---|---|---|
| High-resistance poly resistors | 7 of 30 | [AS03](https://wafer.space/ws-run1/projects/AS03.html), [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [OCD1](https://wafer.space/ws-run1/projects/OCD1.html), [OCD2](https://wafer.space/ws-run1/projects/OCD2.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html), [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) |
| MIM capacitors | 6 of 30 | [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [OCD1](https://wafer.space/ws-run1/projects/OCD1.html), [OCD2](https://wafer.space/ws-run1/projects/OCD2.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html), [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) |
| Unsalicided poly resistors | 3 of 30 | [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [MOSB](https://wafer.space/ws-run1/projects/MOSB.html) |
| Deep N-well | 3 of 30 | [ISHI](https://wafer.space/ws-run1/projects/ISHI.html), [MOS2](https://wafer.space/ws-run1/projects/MOS2.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html) |
| MOS capacitors | 2 of 30 | [MOSB](https://wafer.space/ws-run1/projects/MOSB.html), [TRID](https://wafer.space/ws-run1/projects/TRID.html) |
| Salicided poly resistors | 1 of 30 | [MOSB](https://wafer.space/ws-run1/projects/MOSB.html) |
| Bipolar transistors | 1 of 30 | [MOS2](https://wafer.space/ws-run1/projects/MOS2.html) |
| eFuses | 1 of 30 | [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) |
| Native transistors | 0 of 30 | — |
| 10 V LDMOS | 0 of 30 | — |
| Diffusion resistors | 0 of 30 | — |
| Schottky diodes | 0 of 30 | — |
| Zener diodes | 0 of 30 | — |
| One-time programmable memory | 0 of 30 | — |
| Inductors | 0 of 30 | — |

| Design | Voltages | Custom transistors 3.3 / 5 / 6 V | Devices drawn | I/O library |
|---|---|---|---|---|
| [2975](https://wafer.space/ws-run1/projects/2975.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [AS03](https://wafer.space/ws-run1/projects/AS03.html) | 5 V | 0 / 990 / 0 | High-resistance poly resistors | fd_io, ws_io |
| [BRWN](https://wafer.space/ws-run1/projects/BRWN.html) | 3.3 V, 5 V | 67,982 / 0 / 0 | — | fd_io, ws_io |
| [BTAP](https://wafer.space/ws-run1/projects/BTAP.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [CHES](https://wafer.space/ws-run1/projects/CHES.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [GD02](https://wafer.space/ws-run1/projects/GD02.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [GD03](https://wafer.space/ws-run1/projects/GD03.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [GD04](https://wafer.space/ws-run1/projects/GD04.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [HZ80](https://wafer.space/ws-run1/projects/HZ80.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [ISHI](https://wafer.space/ws-run1/projects/ISHI.html) | 3.3 V, 5 V, 6 V | 9,268 / 4,781 / 90 | MIM capacitors (Metal4), High-resistance poly resistors, Unsalicided poly resistors, Deep N-well | fd_io, ws_io |
| [JKU1](https://wafer.space/ws-run1/projects/JKU1.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [JKU2](https://wafer.space/ws-run1/projects/JKU2.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [KIAN](https://wafer.space/ws-run1/projects/KIAN.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [MOS2](https://wafer.space/ws-run1/projects/MOS2.html) | 3.3 V, 5 V | 3,440 / 1,329 / 0 | MIM capacitors (Metal4), High-resistance poly resistors, Unsalicided poly resistors, Deep N-well, Bipolar transistors | fd_io, ws_io |
| [MOSB](https://wafer.space/ws-run1/projects/MOSB.html) | 3.3 V, 5 V, 6 V | 81,570 / 0 / 448 | MOS capacitors, Unsalicided poly resistors, Salicided poly resistors | fd_io, ws_io |
| [OCD1](https://wafer.space/ws-run1/projects/OCD1.html) | 3.3 V, 5 V, 6 V | 0 / 0 / 44 | MIM capacitors (Metal4), High-resistance poly resistors | ocd_io |
| [OCD2](https://wafer.space/ws-run1/projects/OCD2.html) | 3.3 V, 5 V | 0 / 44 / 0 | MIM capacitors (Metal4), High-resistance poly resistors | ocd_io |
| [RBOY](https://wafer.space/ws-run1/projects/RBOY.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [RZ80](https://wafer.space/ws-run1/projects/RZ80.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [RZML](https://wafer.space/ws-run1/projects/RZML.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [TQVA](https://wafer.space/ws-run1/projects/TQVA.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [TQVC](https://wafer.space/ws-run1/projects/TQVC.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |
| [TRID](https://wafer.space/ws-run1/projects/TRID.html) | 3.3 V, 6 V | 12 / 0 / 8 | MIM capacitors (Metal4), MOS capacitors, High-resistance poly resistors, Deep N-well | fd_io |
| [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) | 5 V | 0 / 0 / 0 | — | fd_io |
| [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) | 3.3 V, 5 V | 18,377 / 0 / 0 | — | ocd_io |
| [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) | 5 V, 6 V | 0 / 47,064 / 44 | MIM capacitors (Metal2, Metal4), High-resistance poly resistors, eFuses | fd_io, ws_io |
| [WSLG](https://wafer.space/ws-run1/projects/WSLG.html) | 5 V | 0 / 0 / 0 | — | fd_io, ws_io |

Detection uses the open GF180MCU layers: a transistor is gate polysilicon ([30/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) over diffusion ([22/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)), thick oxide inside Dualgate ([55/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)), 5 V where V5_XTOR ([112/1](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) also covers it and 6 V where it does not; MIM capacitors are FuseTop ([75/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) shapes; poly resistors are Poly2 under RES_MK ([110/5](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)), high resistance under the Resistor layer ([62/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) and otherwise unsalicided under SAB ([49/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) or salicided. Other devices are found by their marker layers.

## Key Findings

1. The densest logic standard cell design, [2975](https://wafer.space/ws-run1/projects/2975.html) (Cloneless1), achieves **22k logic SC/mm²** averaged over its core (29% of buffer max), with a peak of **32k logic SC/mm²** in its densest 1mm² region.

2. Standard cell libraries in use: **[7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html)** (77% of logic cells), **[9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html)** (21% of logic cells), **[AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3)** (2% of logic cells), **[AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0)** (<1% of logic cells).

3. The median digital design achieves **6k logic SC/mm²** over its core. 7 of 26 designs exceed 10k logic SC/mm².

4. The best standard cell region reaches **310k transistors/mm²** ([TTP2](https://wafer.space/ws-run1/projects/TTP2.html)); the most used SRAM macro, [`gf180mcu_fd_ip_sram__sram512x8m8wm1`](https://gf180mcu-pdk.readthedocs.io/en/latest/IPs/SRAM/gf180mcu_fd_ip_sram/cells/gf180mcu_fd_ip_sram__sram512x8m8wm1/gf180mcu_fd_ip_sram__sram512x8m8wm1.html), is 154k transistors/mm².

5. Infrastructure cells (fillers, taps, antenna diodes, ties) outnumber logic cells **2.8 to 1** across the reticle (6.0M vs 2.1M). Any density analysis must exclude these to avoid dramatically overstating actual logic content.

6. The most common logic cell is **[`nand2_1`](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/cells/nand2/gf180mcu_fd_sc_mcu7t5v0__nand2_1.html)** (228k instances in [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html)).

## Per-Design Details

| Design | Cell | Die (mm) | Core mm² | Placements | Pads | Logic SC | Infra SC | Transistors | SRAM | Libraries |
|---|---|---|---|---|---|---|---|---|---|---|
| [2975](https://wafer.space/ws-run1/projects/2975.html) | `2975_chip_top_0_6` | 3.93 x 5.12 | 14.3 | 2 | 32 | 316,440 | 463,577 | 3,596,371 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 316,440 |
| [AS03](https://wafer.space/ws-run1/projects/AS03.html) | `AS03_chip_top_6_0` | 3.93 x 5.12 | 14.3 | 1 | 74 | 86,629 | 302,626 | 2,430,570 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 80,672, [AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0): 3,587, [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 2,370 |
| [BRWN](https://wafer.space/ws-run1/projects/BRWN.html) | `BRWN_ENGN2912E_TOP_8_2` | 3.93 x 5.12 | 14.3 | 1 | 74 | 4,379 | 64,895 | 649,130 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 4,379 |
| [BTAP](https://wafer.space/ws-run1/projects/BTAP.html) | `BTAP_chip_top_0_0` | 3.93 x 5.12 | 14.3 | 2 | 74 | 43,225 | 156,483 | 2,166,150 | 28 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 43,225 |
| [CAFE](https://wafer.space/ws-run1/projects/CAFE.html) | `CAFE_chip_top_12_0` | 3.93 x 5.12 | 14.3 | 1 | 74 | 100,546 | 266,996 | 2,919,680 | 20 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 100,546 |
| [CHES](https://wafer.space/ws-run1/projects/CHES.html) | `CHES_chip_top_10_4` | 3.93 x 5.12 | 14.3 | 1 | 74 | 145,076 | 406,519 | 2,701,676 | 0 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 145,076 |
| [GD02](https://wafer.space/ws-run1/projects/GD02.html) | `GD02_chip_top_14_4` | 1.94 x 5.12 | 5.5 | 1 | 72 | 34,564 | 78,256 | 968,782 | 9 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 34,564 |
| [GD03](https://wafer.space/ws-run1/projects/GD03.html) | `GD03_chip_top_6_6` | 3.93 x 5.12 | 14.3 | 1 | 74 | 78,208 | 241,732 | 2,730,062 | 23 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 78,208 |
| [GD04](https://wafer.space/ws-run1/projects/GD04.html) | `GD04_chip_top_6_8` | 3.93 x 2.53 | 5.9 | 2 | 72 | 35,525 | 104,165 | 992,924 | 6 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 35,525 |
| [HZ80](https://wafer.space/ws-run1/projects/HZ80.html) | `HZ80_chip_top_14_0` | 1.94 x 5.12 | 5.5 | 1 | 72 | 5,143 | 80,093 | 823,230 | 0 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 5,143 |
| [ISHI](https://wafer.space/ws-run1/projects/ISHI.html) | `ISHI_ISHI-KAI_WS_RUN1_12_4` | 3.93 x 5.12 | 14.3 | 1 | 195 | 0 | 63 | 58,233 | 0 | — |
| [JKU1](https://wafer.space/ws-run1/projects/JKU1.html) | `JKU1_chip_top_10_0` | 3.93 x 5.12 | 14.3 | 1 | 74 | 174,469 | 395,678 | 3,136,970 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 174,469 |
| [JKU2](https://wafer.space/ws-run1/projects/JKU2.html) | `JKU2_chip_top_0_8` | 3.93 x 2.53 | 5.9 | 1 | 72 | 22,476 | 118,209 | 990,939 | 0 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 22,471, [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 5 |
| [KIAN](https://wafer.space/ws-run1/projects/KIAN.html) | `KIAN_chip_top_8_0` | 3.93 x 5.12 | 14.3 | 1 | 74 | 88,941 | 246,524 | 2,442,357 | 21 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 88,941 |
| [MOLE](https://wafer.space/ws-run1/projects/MOLE.html) | `MOLE_chip_top_8_4` | 3.93 x 5.12 | 14.3 | 1 | 74 | 203,757 | 295,366 | 3,404,438 | 6 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 203,757 |
| [MOS2](https://wafer.space/ws-run1/projects/MOS2.html) | `MOS2_chip_top_10_6` | 3.93 x 5.12 | 14.3 | 1 | 162 | 0 | 52 | 80,297 | 0 | — |
| [MOSB](https://wafer.space/ws-run1/projects/MOSB.html) | `MOSB_chip_top_4_0` | 3.93 x 5.12 | 14.3 | 2 | 74 | 17,889 | 8,134 | 287,770 | 0 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 17,889 |
| [OCD1](https://wafer.space/ws-run1/projects/OCD1.html) | `OCD1_caravel_openframe_top_8_6` | 3.93 x 5.12 | 14.3 | 1 | 63 | 34,431 | 524,019 | 1,515,877 | 8 | [AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3): 34,429, [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 2 |
| [OCD2](https://wafer.space/ws-run1/projects/OCD2.html) | `OCD2_gf180mcu_ocd_sram_top_2_8` | 3.93 x 2.53 | 5.9 | 2 | 72 | 122 | 445 | 168,624 | 4 | [AS 7t-3.3V](https://github.com/AvalonSemiconductors/gf180mcu_as_sc_mcu7t3v3): 120, [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 2 |
| [RBOY](https://wafer.space/ws-run1/projects/RBOY.html) | `RBOY_chip_top_12_6` | 3.93 x 5.12 | 14.3 | 1 | 74 | 69,949 | 179,358 | 2,380,904 | 30 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 69,949 |
| [RZ80](https://wafer.space/ws-run1/projects/RZ80.html) | `RZ80_chip_top_0_2` | 3.93 x 5.12 | 14.3 | 2 | 74 | 5,209 | 208,620 | 2,292,402 | 0 | [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 5,209 |
| [RZML](https://wafer.space/ws-run1/projects/RZML.html) | `RZML_chip_top_12_2` | 3.93 x 5.12 | 14.3 | 1 | 74 | 88,407 | 434,355 | 3,284,303 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 88,407 |
| [TQVA](https://wafer.space/ws-run1/projects/TQVA.html) | `TQVA_chip_top_14_8` | 1.94 x 2.53 | 2.3 | 1 | 56 | 35,711 | 62,585 | 475,963 | 1 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 35,711 |
| [TQVB](https://wafer.space/ws-run1/projects/TQVB.html) | `TQVB_chip_top_14_6` | 1.94 x 5.12 | 5.5 | 1 | 72 | 35,416 | 123,968 | 1,089,232 | 1 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 35,416 |
| [TQVC](https://wafer.space/ws-run1/projects/TQVC.html) | `TQVC_chip_top_8_8` | 3.93 x 2.53 | 5.9 | 2 | 72 | 36,116 | 137,094 | 1,209,812 | 1 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 36,116 |
| [TRID](https://wafer.space/ws-run1/projects/TRID.html) | `TRID_TOP_14_2` | 1.94 x 5.12 | 5.5 | 1 | 94 | 0 | 0 | 20,114 | 0 | — |
| [TTP2](https://wafer.space/ws-run1/projects/TTP2.html) | `TTP2_tt_gf_wrapper_6_4` | 3.93 x 5.12 | 14.3 | 1 | 74 | 203,781 | 366,289 | 3,234,274 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 200,156, [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 3,625 |
| [TTPG](https://wafer.space/ws-run1/projects/TTPG.html) | `TTPG_tt_gf_wrapper_6_2` | 3.93 x 5.12 | 14.3 | 1 | 74 | 203,780 | 366,311 | 3,254,189 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 200,155, [9t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu9t5v0/index.html): 3,625 |
| [TZ01](https://wafer.space/ws-run1/projects/TZ01.html) | `TZ01_chip_top_0_4` | 3.93 x 5.12 | 14.3 | 2 | 74 | 58,018 | 228,360 | 2,014,212 | 8 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 58,018 |
| [WSLG](https://wafer.space/ws-run1/projects/WSLG.html) | `WSLG_chip_top_10_2` | 3.93 x 5.12 | 14.3 | 1 | 74 | 14,290 | 145,520 | 1,506,245 | 0 | [7t-5V](https://gf180mcu-pdk.readthedocs.io/en/latest/digital/standard_cells/gf180mcu_fd_sc_mcu7t5v0/index.html): 12,598, [AS extra 7t-5V](https://github.com/AvalonSemiconductors/gf180mcu_as_ex_mcu7t5v0): 1,692 |

## Methodology

- **Logic cell counts** come from walking the layout hierarchy and counting instances of every cell whose name contains a standard cell library prefix, excluding types starting with `fill`, `endcap`, `filltie`, `fillcap`, `tap`, `antenna`, `diode`, `tiel`, `tieh`.
- **Transistor counts** are the number of merged polygons in the boolean AND of the diffusion ([22/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) and gate polysilicon ([30/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)) layers, leaving out dummy fill cells, whose diffusion and polysilicon squares overlap without forming transistors.
- **Core area** is (die width − 0.70mm) x (die height − 0.70mm), removing a 350um pad ring from each side.
- **Cell dimensions** are the width and height of each standard cell's placement boundary ([GDS 0/0](https://gf180mcu-pdk.readthedocs.io/en/latest/physical_verification/design_manual/drm_04_1.html#drawn-layer-definition-and-abbreviation)), measured from the cells present in this layout.
- **Theoretical maximum** = (1000um / cell width) x (1000um / row height).
- **Peak figures** are the densest 1mm x 1mm square anywhere inside each die, found by sliding the square in 100um steps over the die and skipping positions that touch an SRAM macro. Logic cells are placed by their origin and transistors by the centre of their gate.
- **SRAM macros** are counted by cell name. The `sram_block_count` column of the summary CSV is kept for comparison with earlier results; it counts SramCore marker shapes, of which each GF180MCU macro has two.
- Designs placed more than once on the reticle are counted once.

### Difference from the March 2026 Run 1 report

The first version of the Run 1 report measured cell width and row height from each cell's overall bounding box. That box includes n-well and implant shapes which deliberately overhang the cell and overlap its neighbours, so it is larger than the area a placed cell occupies: 4.22 x 4.78um instead of 3.36 x 3.92um for a 7-track buffer. Theoretical maximum densities in that version were therefore about 35% too low, and every "% of max" figure correspondingly too high. This report uses the placement boundary. It also reported SRAM "blocks" by counting SramCore marker shapes, which gave twice the number of macros. Logic cell counts, transistor counts and achieved densities are unchanged.

---

*Generated by [ws-run-reports](https://github.com/wafer-space/ws-run-reports) from `G801.oas` (md5 `3ae7349e205f60d9f997cf7d3a688500`) in [wafer-space/ws-run1](https://github.com/wafer-space/ws-run1). Analysis method: [KLayout](https://www.klayout.de/) boolean geometry operations on GDS layers. Grid resolution: 1mm x 1mm. Density figures are rounded to the nearest 1k.*
