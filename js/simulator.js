// --- SIMULATOR & CONSOLE LOGIC ---
let simIsRunning = false;
let simEventQueue = [];
let simPixelBrightness = 0.3;
let simPixelRaw = [0, 0, 0];

function simSleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function colorwheel(pos) {
    pos = Math.round(pos) & 0xFF;
    if (pos < 85) return `rgb(${255 - pos * 3}, ${pos * 3}, 0)`;
    if (pos < 170) { pos -= 85; return `rgb(0, ${255 - pos * 3}, ${pos * 3})`; }
    pos -= 170; return `rgb(${pos * 3}, 0, ${255 - pos * 3})`;
}

function setPixelBrightness(b) {
    simPixelBrightness = Math.max(0, Math.min(1, b));
    setPixelColor(`rgb(${simPixelRaw.join(', ')})`);
}

function setPixelColor(rgbString) {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) simPixelRaw = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    const r = Math.round(simPixelRaw[0] * simPixelBrightness);
    const g = Math.round(simPixelRaw[1] * simPixelBrightness);
    const b = Math.round(simPixelRaw[2] * simPixelBrightness);
    const dimmed = `rgb(${r}, ${g}, ${b})`;
    const pixel = document.getElementById('sim-pixel');
    if (r === 0 && g === 0 && b === 0) {
        pixel.style.backgroundColor = 'rgba(0,0,0,0.5)';
        pixel.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5)';
    } else {
        pixel.style.backgroundColor = dimmed;
        pixel.style.boxShadow = `0 0 15px 5px ${dimmed}, inset 0 0 5px white`;
    }
}

const simServoMap = {};

function simServoSetup(varName, pin) {
    simServoMap[varName] = pin;

    // highlight overlay
    const overlayEl = document.getElementById('sim-servo-' + pin.replace('board.', '').toLowerCase());
    if (overlayEl) overlayEl.classList.add('active');

    // create status bar row if not already present
    const panel = document.getElementById('sim-servos');
    const rowId = 'sim-servo-row-' + varName;
    if (!document.getElementById(rowId)) {
        const row = document.createElement('div');
        row.className = 'sim-motor-row';
        row.id = rowId;
        row.innerHTML = `
            <span class="sim-motor-label" style="width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${varName}">${varName}</span>
            <div class="sim-motor-bar-wrap">
                <div class="sim-motor-bar" id="sim-servo-bar-${varName}" style="left:0%;width:0%;background:#8b5cf6"></div>
            </div>
            <span class="sim-motor-value" id="sim-servo-val-${varName}" style="color:#8b5cf6">90°</span>`;
        panel.appendChild(row);
    }
    simServoAngle(varName, 90);
}

function simServoAngle(varName, angle) {
    const a = Math.max(0, Math.min(180, parseFloat(angle)));
    const bar = document.getElementById(`sim-servo-bar-${varName}`);
    const val = document.getElementById(`sim-servo-val-${varName}`);
    if (bar) bar.style.width = `${(a / 180) * 100}%`;
    if (val) val.textContent = Math.round(a) + '°';
}

function setMotorState(motorNum, throttle) {
    const t = Math.max(-1, Math.min(1, parseFloat(throttle)));
    const abs = Math.abs(t);

    // --- overlay on SVG board ---
    const overlay = document.getElementById(`sim-motor${motorNum}-overlay`);
    if (abs === 0) {
        overlay.style.backgroundColor = 'rgba(100, 100, 100, 0.4)';
        overlay.style.boxShadow = 'none';
    } else if (t > 0) {
        overlay.style.backgroundColor = `rgba(16, 185, 129, ${0.3 + abs * 0.7})`;
        overlay.style.boxShadow = `0 0 ${abs * 10}px ${abs * 4}px rgba(16, 185, 129, 0.8)`;
    } else {
        overlay.style.backgroundColor = `rgba(239, 68, 68, ${0.3 + abs * 0.7})`;
        overlay.style.boxShadow = `0 0 ${abs * 10}px ${abs * 4}px rgba(239, 68, 68, 0.8)`;
    }

    // --- status bar panel ---
    const bar = document.getElementById(`sim-motor${motorNum}-bar`);
    const val = document.getElementById(`sim-motor${motorNum}-value`);
    val.textContent = t.toFixed(2);
    if (abs === 0) {
        bar.style.width = '0%';
        bar.style.left = '50%';
        bar.style.background = '#6b7280';
        val.style.color = '#6b7280';
    } else if (t > 0) {
        bar.style.width = `${abs * 50}%`;
        bar.style.left = '50%';
        bar.style.background = '#10b981';
        val.style.color = '#10b981';
    } else {
        bar.style.width = `${abs * 50}%`;
        bar.style.left = `${50 - abs * 50}%`;
        bar.style.background = '#ef4444';
        val.style.color = '#ef4444';
    }
}

function simDigitalRead(varName) {
    printToConsole(`Digital Input "${varName}" read → false (simulated)`, false, 'sys');
    return false;
}

function simAnalogRead(varName) {
    printToConsole(`Analog Input "${varName}" read → 0 (simulated)`, false, 'sys');
    return 0;
}

function printToConsole(msg, isHardware = false, type = 'normal') {
    const cons = document.getElementById('simConsole');
    let cleanMsg = msg;
    let cssClass = "";

    if (isHardware) {
        cleanMsg = msg.replace(/\r/g, '');
        if (cleanMsg.includes("Traceback") || cleanMsg.includes("Error:") || cleanMsg.includes("Exception")) {
            cssClass = "error-text";
        }
    } else {
        cleanMsg = msg + '\n';
        if (type === 'sys') cssClass = "sys-text";
    }

    if (cssClass) {
        cons.innerHTML += `<span class="${cssClass}">${cleanMsg}</span>`;
    } else {
        const textNode = document.createTextNode(cleanMsg);
        cons.appendChild(textNode);
    }
    cons.scrollTop = cons.scrollHeight;
}

// --- BIND HITBOX EVENTS ---
const bootHitbox = document.getElementById('sim-boot-hitbox');

bootHitbox.addEventListener('mousedown', () => simEventQueue.push('pressed'));
bootHitbox.addEventListener('mouseup', () => simEventQueue.push('released'));
bootHitbox.addEventListener('mouseleave', (e) => {
    if (e.buttons === 1) simEventQueue.push('released');
});

bootHitbox.addEventListener('touchstart', (e) => {
    e.preventDefault();
    simEventQueue.push('pressed');
});
bootHitbox.addEventListener('touchend', (e) => {
    e.preventDefault();
    simEventQueue.push('released');
});

async function runSimulator() {
    simIsRunning = false;
    await simSleep(50);
    simIsRunning = true;
    simEventQueue = [];
    printToConsole("--- Simulator Started ---", false, 'sys');

    const jsCode = javascript.javascriptGenerator.workspaceToCode(workspace);
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const executeSim = new AsyncFunction(jsCode);
    try { await executeSim(); } catch (err) { console.error("Simulator error:", err); }
}

function copyCode(e) {
    e.preventDefault();
    const code = document.getElementById('codePreview').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyCodeBtn');
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = '⎘ Copy', 1500);
    });
}

function stopSimulator() {
    simIsRunning = false;
    simPixelBrightness = 0.3;
    simPixelRaw = [0, 0, 0];
    setPixelColor('rgb(0, 0, 0)');
    setMotorState(1, 0);
    setMotorState(2, 0);
    Object.keys(simServoMap).forEach(k => delete simServoMap[k]);
    document.querySelectorAll('.sim-servo-overlay').forEach(el => el.classList.remove('active'));
    document.getElementById('sim-servos').innerHTML = '';
    printToConsole("--- Simulator Stopped ---", false, 'sys');
}
