# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

- GitHub: https://github.com/CRCibernetica/IdeaScratch
- Live deployment: https://crcibernetica.github.io/IdeaScratch/

## Project Overview

IdeaScratch (v1.40) is a browser-based visual programming IDE for the **IdeaBoard** microcontroller. Users drag-and-drop Blockly blocks to generate CircuitPython code, then either simulate it in the browser or flash it to real hardware via Web Serial API.

## Running the App

Open `index.html` directly in a browser — no build step, no server, no package manager. Chrome is recommended for Web Serial API support (hardware connectivity). Firefox/Safari lack Web Serial support.

## Architecture

The companion file **`ideaboard.svg`** is the visual board diagram embedded in the simulator panel.

## Versioning

The version number appears in two places and **must be updated on every commit**:
- `index.html` — `<title>` tag and `<h2>` heading (e.g. `IdeaScratch v1.30`)
- `CLAUDE.md` — project overview line

Increment the minor version (e.g. v1.30 → v1.31) for each change unless the user specifies otherwise.

### File structure

| File | Purpose |
|---|---|
| `index.html` | HTML structure, toolbox XML, script/link tags |
| `css/styles.css` | All styles |
| `js/blocks.js` | Custom Blockly block definitions |
| `js/generators.js` | Python + JS code generators for each block |
| `js/simulator.js` | Simulator state, pixel, console, boot button events |
| `js/serial.js` | Web Serial connection, flash, read loop |
| `js/storage.js` | Examples (XML), `localStorage` save/load/delete, dropdown logic |
| `js/workspace.js` | Blockly init, resize logic, `toggleSidebar` — loads last |

### Dual-path execution model

```
Blockly workspace
      │
      ├─ Python generator ──► CircuitPython code (displayed in code panel)
      │                              │
      │                              └─► Web Serial ──► IdeaBoard hardware
      │
      └─ JavaScript generator ──► async JS ──► browser simulation
```

Both generators are defined for every custom block. The Python generator produces CircuitPython for flashing; the JS generator produces equivalent async JavaScript for the in-browser simulator.

### Hardware serial protocol (flashing)

1. `\x03` — Ctrl+C (interrupt)
2. `\x01` — Ctrl+A (raw REPL mode)
3. Write `code.py` content
4. `\x04` — Ctrl+D (soft reset / execute)
5. `\x02` — Ctrl+B (exit raw REPL)

Baud rate: **115200**

### Simulator interaction

- Boot button hitbox overlays the top-right of the board SVG
- Mouse/touch events push `'pressed'`/`'released'` onto `simEventQueue`
- `setPixelColor()` updates the visual pixel on the SVG board
- Code executes via `new AsyncFunction(...)` to support `await`-based timing

## CDN Dependencies

All dependencies load from jsDelivr — no local installs needed:
- `blockly.min.js`
- `python_compressed.js` (Python code generator)
- `javascript_compressed.js` (JS code generator for simulation)
