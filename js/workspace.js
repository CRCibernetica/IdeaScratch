// --- WORKSPACE INITIALIZATION ---
const ideaTheme = Blockly.Theme.defineTheme('ideaScratch', {
    base: Blockly.Themes.Zelos,
    componentStyles: {
        workspaceBackgroundColour: '#f9f9f9',
        toolboxBackgroundColour: '#ffffff',
        toolboxForegroundColour: '#575e75',
        flyoutBackgroundColour: '#e9e9e9',
        flyoutForegroundColour: '#575e75',
        flyoutOpacity: 1,
        scrollbarColour: '#aaaaaa',
        scrollbarOpacity: 0.5,
        insertionMarkerColour: '#7c3aed',
        insertionMarkerOpacity: 0.5,
    }
});

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'thrasos',
    theme: ideaTheme,
    grid: {spacing: 20, length: 3, colour: '#e0e0e0', snap: true},
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
