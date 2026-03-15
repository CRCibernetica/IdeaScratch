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

function setMotorState(motorNum, throttle) {
    const el = document.getElementById(motorNum === 1 ? 'sim-motor1' : 'sim-motor2');
    const t = Math.max(-1, Math.min(1, parseFloat(throttle)));
    const abs = Math.abs(t);
    if (abs === 0) {
        el.style.backgroundColor = 'rgba(100, 100, 100, 0.4)';
        el.style.boxShadow = 'none';
    } else if (t > 0) {
        el.style.backgroundColor = `rgba(16, 185, 129, ${0.3 + abs * 0.7})`;
        el.style.boxShadow = `0 0 ${abs * 10}px ${abs * 4}px rgba(16, 185, 129, 0.7)`;
    } else {
        el.style.backgroundColor = `rgba(239, 68, 68, ${0.3 + abs * 0.7})`;
        el.style.boxShadow = `0 0 ${abs * 10}px ${abs * 4}px rgba(239, 68, 68, 0.7)`;
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

function stopSimulator() {
    simIsRunning = false;
    simPixelBrightness = 0.3;
    simPixelRaw = [0, 0, 0];
    setPixelColor('rgb(0, 0, 0)');
    setMotorState(1, 0);
    setMotorState(2, 0);
    printToConsole("--- Simulator Stopped ---", false, 'sys');
}
