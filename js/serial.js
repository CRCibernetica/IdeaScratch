// --- HARDWARE SERIAL LOGIC ---
let boardPort = null;
let boardWriter = null;
let serialReader = null;
let isConnected = false;
let isFlashing = false;
let keepReading = false;

async function readLoop() {
    const decoder = new TextDecoder();
    while (boardPort && keepReading) {
        serialReader = boardPort.readable.getReader();
        try {
            while (true) {
                const { value, done } = await serialReader.read();
                if (done) break;

                if (!isFlashing && value) {
                    const text = decoder.decode(value, {stream: true});
                    printToConsole(text, true);
                }
            }
        } catch (error) {
            console.error("Serial read error:", error);
            break;
        } finally {
            if (serialReader) {
                serialReader.releaseLock();
                serialReader = null;
            }
        }
    }
}

async function toggleConnection() {
    if (isConnected) {
        try {
            keepReading = false;
            if (serialReader) { await serialReader.cancel(); }
            if (boardWriter) { boardWriter.releaseLock(); boardWriter = null; }
            if (boardPort) { await boardPort.close(); boardPort = null; }
            isConnected = false;
            document.getElementById('connectBtn').innerText = "Connect";
            document.getElementById('connectBtn').style.background = "#007bff";
            document.getElementById('runBtn').disabled = true;
            document.getElementById('stopBtn').disabled = true;
            document.getElementById('statusLabel').innerText = "Status: Disconnected";
        } catch (err) { console.error("Disconnect error:", err); }
    } else {
        try {
            boardPort = await navigator.serial.requestPort();
            await boardPort.open({ baudRate: 115200 });
            boardWriter = boardPort.writable.getWriter();
            isConnected = true;
            keepReading = true;

            readLoop();

            document.getElementById('connectBtn').innerText = "Disconnect";
            document.getElementById('connectBtn').style.background = "#6c757d";
            document.getElementById('runBtn').disabled = false;
            document.getElementById('stopBtn').disabled = false;
            document.getElementById('statusLabel').innerText = "Status: Online";
            printToConsole("--- Hardware Connected ---", false, 'sys');
        } catch (err) {
            console.error(err);
            alert("Could not connect. Ensure no other apps (like Thonny) are using the port.");
        }
    }
}

async function stopCode() {
    if (!boardWriter || !isConnected) return;
    try {
        isFlashing = true;
        const encoder = new TextEncoder();
        await boardWriter.write(encoder.encode('\x03'));
        document.getElementById('statusLabel').innerText = "Status: Code Stopped";
        setTimeout(() => { isFlashing = false; }, 200);
    } catch(err) {}
}

async function runCode() {
    if (!boardWriter) return;
    document.getElementById('statusLabel').innerText = "Status: Flashing...";

    isFlashing = true;
    printToConsole("--- Flashing Code to Hardware ---", false, 'sys');

    const rawBlockCode = python.pythonGenerator.workspaceToCode(workspace);
    const pyHeader = `import board\nfrom ideaboard import IdeaBoard\nfrom time import sleep\nimport keypad\n\nib = IdeaBoard()\nkeys = keypad.Keys((board.IO0,), value_when_pressed=False, pull=True)\n\n`;
    const code = pyHeader + rawBlockCode;

    const encoder = new TextEncoder();
    try {
        await boardWriter.write(encoder.encode('\x03\x03'));
        await new Promise(r => setTimeout(r, 300));
        await boardWriter.write(encoder.encode('\x01'));
        await new Promise(r => setTimeout(r, 300));
        const transferScript = `f=open('code.py','w');f.write('''${code}''');f.close()\n`;
        await boardWriter.write(encoder.encode(transferScript));
        await boardWriter.write(encoder.encode('\x04'));
        await new Promise(r => setTimeout(r, 600));
        await boardWriter.write(encoder.encode('\x02'));
        await new Promise(r => setTimeout(r, 200));

        isFlashing = false;
        await boardWriter.write(encoder.encode('\x04'));

        document.getElementById('statusLabel').innerText = "Status: Success! Code is running.";
    } catch (err) {
        console.error("Flash failed", err);
        document.getElementById('statusLabel').innerText = "Status: Error flashing.";
        isFlashing = false;
    }
}
