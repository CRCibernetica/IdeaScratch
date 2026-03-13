// --- SIMULATOR & CONSOLE LOGIC ---
let simIsRunning = false;
let simEventQueue = [];

function simSleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function setPixelColor(rgbString) {
    const pixel = document.getElementById('sim-pixel');
    if (rgbString === 'rgb(0, 0, 0)') {
        pixel.style.backgroundColor = 'rgba(0,0,0,0.5)';
        pixel.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5)';
    } else {
        pixel.style.backgroundColor = rgbString;
        pixel.style.boxShadow = `0 0 15px 5px ${rgbString}, inset 0 0 5px white`;
    }
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
    setPixelColor('rgb(0, 0, 0)');
    printToConsole("--- Simulator Stopped ---", false, 'sys');
}
