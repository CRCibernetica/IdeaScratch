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

python.pythonGenerator.forBlock['ib_servo_setup'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('SERVO_VAR'));
    const pin = block.getFieldValue('PIN');
    return `${varName} = ib.Servo(${pin})\n`;
};
python.pythonGenerator.forBlock['ib_servo_angle'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('SERVO_VAR'));
    const angle = block.getFieldValue('ANGLE');
    return `${varName}.angle = ${angle}\n`;
};

python.pythonGenerator.forBlock['ib_digital_in_setup'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const pin = block.getFieldValue('PIN');
    const pull = block.getFieldValue('PULL');
    if (pull === 'None') return `${varName} = ib.DigitalIn(${pin})\n`;
    return `${varName} = ib.DigitalIn(${pin}, pull=${pull})\n`;
};
python.pythonGenerator.forBlock['ib_digital_in_read'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    return [`${varName}.value`, python.Order.ATOMIC];
};
python.pythonGenerator.forBlock['ib_digital_out_setup'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const pin = block.getFieldValue('PIN');
    return `${varName} = ib.DigitalOut(${pin})\n`;
};
python.pythonGenerator.forBlock['ib_digital_out_write'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const val = block.getFieldValue('VALUE');
    return `${varName}.value = ${val}\n`;
};
python.pythonGenerator.forBlock['ib_analog_in_setup'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const pin = block.getFieldValue('PIN');
    return `${varName} = ib.AnalogIn(${pin})\n`;
};
python.pythonGenerator.forBlock['ib_analog_in_read'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    return [`${varName}.value`, python.Order.ATOMIC];
};
python.pythonGenerator.forBlock['ib_analog_out_setup'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const pin = block.getFieldValue('PIN');
    return `${varName} = ib.AnalogOut(${pin})\n`;
};
python.pythonGenerator.forBlock['ib_analog_out_write'] = function(block) {
    const varName = python.pythonGenerator.getVariableName(block.getFieldValue('PIN_VAR'));
    const val = block.getFieldValue('VALUE');
    return `${varName}.value = ${val}\n`;
};

python.pythonGenerator.forBlock['ib_brightness'] = function(block) {
    return `ib.brightness = ${block.getFieldValue('BRIGHTNESS')}\n`;
};
python.pythonGenerator.forBlock['ib_arcoiris'] = function(block) {
    return `ib.arcoiris = ${block.getFieldValue('VALUE')}\n`;
};

python.pythonGenerator.forBlock['ib_motors'] = function(block) {
    const m1 = block.getFieldValue('MOTOR1');
    const m2 = block.getFieldValue('MOTOR2');
    return `ib.motor_1.throttle = ${m1}\nib.motor_2.throttle = ${m2}\n`;
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
javascript.javascriptGenerator.forBlock['ib_servo_setup'] = function(block) {
    const varName = block.getFieldValue('SERVO_VAR');
    const pin = block.getFieldValue('PIN');
    return `printToConsole('Servo "${varName}" ready on ${pin}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_servo_angle'] = function(block) {
    const varName = block.getFieldValue('SERVO_VAR');
    const angle = block.getFieldValue('ANGLE');
    return `printToConsole('Servo "${varName}" → ${angle}°', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_digital_in_setup'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const pin = block.getFieldValue('PIN');
    return `printToConsole('Digital Input "${varName}" ready on ${pin}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_digital_in_read'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    return [`(simDigitalRead('${varName}'))`, javascript.Order.ATOMIC];
};
javascript.javascriptGenerator.forBlock['ib_digital_out_setup'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const pin = block.getFieldValue('PIN');
    return `printToConsole('Digital Output "${varName}" ready on ${pin}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_digital_out_write'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const val = block.getFieldValue('VALUE');
    return `printToConsole('Digital Output "${varName}" → ${val}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_analog_in_setup'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const pin = block.getFieldValue('PIN');
    return `printToConsole('Analog Input "${varName}" ready on ${pin}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_analog_in_read'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    return [`(simAnalogRead('${varName}'))`, javascript.Order.ATOMIC];
};
javascript.javascriptGenerator.forBlock['ib_analog_out_setup'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const pin = block.getFieldValue('PIN');
    return `printToConsole('Analog Output "${varName}" ready on ${pin}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_analog_out_write'] = function(block) {
    const varName = block.getFieldValue('PIN_VAR');
    const val = block.getFieldValue('VALUE');
    return `printToConsole('Analog Output "${varName}" → ${val}', false, 'sys');\n`;
};
javascript.javascriptGenerator.forBlock['ib_brightness'] = function(block) {
    const b = block.getFieldValue('BRIGHTNESS');
    return `setPixelBrightness(${b});\n`;
};
javascript.javascriptGenerator.forBlock['ib_arcoiris'] = function(block) {
    const v = block.getFieldValue('VALUE');
    return `setPixelColor(colorwheel(${v}));\n`;
};
javascript.javascriptGenerator.forBlock['ib_motors'] = function(block) {
    const m1 = block.getFieldValue('MOTOR1');
    const m2 = block.getFieldValue('MOTOR2');
    return `printToConsole('Motor 1: ${m1}  Motor 2: ${m2}', false, 'sys');\n`;
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
