// --- WORKSPACE INITIALIZATION ---
const darkTheme = Blockly.Theme.defineTheme('ideaScratchDark', {
    base: Blockly.Themes.Zelos,
    componentStyles: {
        workspaceBackgroundColour: '#1e1e2e',
        toolboxBackgroundColour: '#252540',
        toolboxForegroundColour: '#e2e8f0',
        flyoutBackgroundColour: '#2d2d3a',
        flyoutForegroundColour: '#e2e8f0',
        flyoutOpacity: 1,
        scrollbarColour: '#4b5563',
        scrollbarOpacity: 0.5,
        insertionMarkerColour: '#7c3aed',
        insertionMarkerOpacity: 0.5,
    }
});

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'thrasos',
    theme: darkTheme,
    grid: {spacing: 20, length: 3, colour: '#2d2d3a', snap: true},
    trashcan: true
});



workspace.addChangeListener(() => {
    const generatedCode = python.pythonGenerator.workspaceToCode(workspace);
    const header = `import board\nfrom ideaboard import IdeaBoard\nfrom time import sleep\nimport keypad\n\nib = IdeaBoard()\nkeys = keypad.Keys((board.IO0,), value_when_pressed=False, pull=True)\n\n`;
    document.getElementById('codePreview').innerText = header + generatedCode;
});

// Fix Blockly Resize Bug — forces Blockly to redraw when panels are opened/closed or window resizes
const resizeBlockly = () => {
    setTimeout(() => { Blockly.svgResize(workspace); }, 50);
};
window.addEventListener('resize', resizeBlockly);
document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', resizeBlockly);
});

function toggleSidebar() {
    const sidebar = document.getElementById('simSidebar');
    const btn = document.getElementById('toggleSidebarBtn');
    sidebar.classList.toggle('collapsed');
    setTimeout(() => Blockly.svgResize(workspace), 310);
    if (sidebar.classList.contains('collapsed')) {
        btn.innerText = "▶ Show Simulator";
    } else {
        btn.innerText = "◀ Hide Simulator";
    }
}
