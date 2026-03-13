// --- PYTHON GENERATORS ---
python.pythonGenerator.forBlock['ib_pixel'] = function(block) {
    return `ib.pixel = (${block.getFieldValue('COLOUR')})\n`;
};
python.pythonGenerator.forBlock['time_sleep'] = function(block) {
    return `sleep(${block.getFieldValue('SECONDS') || 1})\n`;
};
python.pythonGenerator.forBlock['controls_forever'] = function(block) {
    const indent = python.pythonGenerator.INDENT || '  ';
    let branch = python.pythonGenerator.statementToCode(block, 'DO');
    if (!branch) branch = indent + 'pass\n';
    return `while True:\n${indent}sleep(0.01)\n${branch}`;
};
python.pythonGenerator.forBlock['ib_event_handler'] = function(block) {
    const indent = python.pythonGenerator.INDENT || '  ';
    let branch = python.pythonGenerator.statementToCode(block, 'DO');
    if (!branch) branch = indent + 'pass\n';
    return `event = keys.events.get()\nif event:\n${branch}`;
};
python.pythonGenerator.forBlock['ib_event_state'] = function(block) {
    const state = block.getFieldValue('STATE');
    return [`event.${state}`, python.Order.ATOMIC];
};

// --- JAVASCRIPT SIMULATOR GENERATORS ---
javascript.javascriptGenerator.forBlock['ib_pixel'] = function(block) {
    return `setPixelColor('rgb(${block.getFieldValue('COLOUR')})');\n`;
};
javascript.javascriptGenerator.forBlock['time_sleep'] = function(block) {
    return `await simSleep(${(block.getFieldValue('SECONDS') || 1) * 1000});\n`;
};
javascript.javascriptGenerator.forBlock['controls_forever'] = function(block) {
    const branch = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `while (simIsRunning) {\n${branch}\n  await simSleep(20);\n}\n`;
};
javascript.javascriptGenerator.forBlock['ib_event_handler'] = function(block) {
    const branch = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `let _sim_event = simEventQueue.shift();\nif (_sim_event) {\n${branch}}\n`;
};
javascript.javascriptGenerator.forBlock['ib_event_state'] = function(block) {
    const state = block.getFieldValue('STATE');
    return [`(_sim_event === '${state}')`, javascript.Order.ATOMIC];
};
javascript.javascriptGenerator.forBlock['text_print'] = function(block) {
    const msg = javascript.javascriptGenerator.valueToCode(block, 'TEXT', javascript.javascriptGenerator.ORDER_NONE) || "''";
    return `printToConsole(${msg}, false, 'normal');\n`;
};
