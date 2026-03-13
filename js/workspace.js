// --- WORKSPACE INITIALIZATION ---
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    grid: {spacing: 20, length: 3, colour: '#ccc', snap: true},
    trashcan: true
});

const defaultBlocksXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="20" y="20">
    <value name="TEXT">
      <shadow type="text"><field name="TEXT">System Ready! Waiting for button...</field></shadow>
    </value>
    <next>
      <block type="controls_forever">
        <statement name="DO">
          <block type="ib_event_handler">
            <statement name="DO">
              <block type="controls_if">
                <mutation elseif="1"></mutation>
                <value name="IF0">
                  <block type="ib_event_state"><field name="STATE">released</field></block>
                </value>
                <statement name="DO0">
                  <block type="ib_pixel"><field name="COLOUR">0, 0, 0</field>
                    <next>
                      <block type="text_print">
                        <value name="TEXT"><shadow type="text"><field name="TEXT">released</field></shadow></value>
                      </block>
                    </next>
                  </block>
                </statement>
                <value name="IF1">
                  <block type="ib_event_state"><field name="STATE">pressed</field></block>
                </value>
                <statement name="DO1">
                  <block type="ib_pixel"><field name="COLOUR">0, 255, 0</field>
                    <next>
                      <block type="text_print">
                        <value name="TEXT"><shadow type="text"><field name="TEXT">pressed</field></shadow></value>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>`;
Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(defaultBlocksXml), workspace);

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
