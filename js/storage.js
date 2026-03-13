// --- EXAMPLES ---
const examples = {
    buttonLED: `<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>`,

    blink: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_forever" x="20" y="20">
    <statement name="DO">
      <block type="ib_pixel">
        <field name="COLOUR">255, 0, 0</field>
        <next>
          <block type="time_sleep">
            <field name="SECONDS">1</field>
            <next>
              <block type="ib_pixel">
                <field name="COLOUR">0, 0, 0</field>
                <next>
                  <block type="time_sleep">
                    <field name="SECONDS">1</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`,

    motorForward: `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="ib_motors" x="20" y="20">
    <field name="MOTOR1">1</field>
    <field name="MOTOR2">1</field>
    <next>
      <block type="time_sleep">
        <field name="SECONDS">2</field>
        <next>
          <block type="ib_motors">
            <field name="MOTOR1">0</field>
            <field name="MOTOR2">0</field>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`
};

// --- LOCAL STORAGE ---
const STORAGE_PREFIX = 'ideascratch_project_';

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function listProjects() {
    return Object.keys(localStorage)
        .filter(k => k.startsWith(STORAGE_PREFIX))
        .map(k => k.slice(STORAGE_PREFIX.length))
        .sort();
}

function saveProject() {
    const name = prompt('Enter a name for your project:');
    if (!name || !name.trim()) return;
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    localStorage.setItem(STORAGE_PREFIX + name.trim(), xml);
    closeAllDropdowns();
}

function loadProject(name) {
    const xml = localStorage.getItem(STORAGE_PREFIX + name);
    if (!xml) return;
    workspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
    closeAllDropdowns();
}

function deleteProject(name) {
    if (!confirm(`Delete "${name}"?`)) return;
    localStorage.removeItem(STORAGE_PREFIX + name);
    refreshProjectsMenu();
}

function loadExample(name) {
    const xml = examples[name];
    if (!xml) return;
    workspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
    closeAllDropdowns();
}

// --- DROPDOWN LOGIC ---
function toggleDropdown(id) {
    const menu = document.getElementById(id);
    const isOpen = menu.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
        if (id === 'projectsMenu') refreshProjectsMenu();
        menu.classList.add('open');
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
}

function refreshProjectsMenu() {
    const menu = document.getElementById('projectsMenu');
    const projects = listProjects();

    let html = `<div class="dropdown-item save-item" data-action="save">💾 Save Project</div>
                <div class="dropdown-divider"></div>`;

    if (projects.length > 0) {
        projects.forEach((name, i) => {
            html += `<div class="dropdown-item" data-action="load" data-index="${i}">
                        <span>${escapeHtml(name)}</span>
                        <button class="delete-btn" data-action="delete" data-index="${i}">✕</button>
                     </div>`;
        });
    } else {
        html += `<div class="dropdown-item no-projects">No saved projects yet</div>`;
    }

    menu.innerHTML = html;

    menu.querySelector('[data-action="save"]').addEventListener('click', () => saveProject());
    menu.querySelectorAll('[data-action="load"]').forEach(el =>
        el.addEventListener('click', () => loadProject(projects[el.dataset.index]))
    );
    menu.querySelectorAll('[data-action="delete"]').forEach(el =>
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProject(projects[el.dataset.index]);
        })
    );
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-wrapper')) closeAllDropdowns();
});
