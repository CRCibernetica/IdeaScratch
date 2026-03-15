// --- BLOCK DEFINITIONS ---
Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "ib_pixel",
        "message0": "Set Pixel to %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOUR",
                "options": [
                    ["🔴 Red", "255, 0, 0"], ["🟢 Green", "0, 255, 0"], ["🔵 Blue", "0, 0, 255"],
                    ["🟡 Yellow", "255, 255, 0"], ["🟣 Purple", "128, 0, 128"],
                    ["⚪ White", "255, 255, 255"], ["⚫ Off (Black)", "0, 0, 0"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "controls_on_start",
        "message0": "On Start %1 %2",
        "args0": [{"type": "input_dummy"}, {"type": "input_statement", "name": "DO"}],
        "colour": 120,
        "tooltip": "Code inside here runs once at the beginning"
    },
    {
        "type": "time_sleep",
        "message0": "Wait %1 seconds",
        "args0": [{"type": "input_value", "name": "SECONDS", "check": "Number"}],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "controls_forever",
        "message0": "Forever %1 %2",
        "args0": [{"type": "input_dummy"}, {"type": "input_statement", "name": "DO"}],
        "previousStatement": null,
        "colour": 120
    },
    {
        "type": "ib_event_handler",
        "message0": "Check Boot button events %1 %2",
        "args0": [
            {"type": "input_dummy"},
            {"type": "input_statement", "name": "DO"}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 65
    },
    {
        "type": "ib_motors",
        "message0": "Set Motors  Motor 1 %1  Motor 2 %2",
        "args0": [
            {"type": "input_value", "name": "MOTOR1", "check": "Number"},
            {"type": "input_value", "name": "MOTOR2", "check": "Number"}
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Set motor speed: 1.0 = full forward, -1.0 = full reverse, 0 = brake"
    },
    {
        "type": "ib_brightness",
        "message0": "Set Pixel Brightness %1",
        "args0": [{"type": "input_value", "name": "BRIGHTNESS", "check": "Number"}],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Set pixel brightness: 0.0 = off, 1.0 = full brightness"
    },
    {
        "type": "ib_arcoiris",
        "message0": "Set Pixel Rainbow Color %1",
        "args0": [{"type": "input_value", "name": "VALUE", "check": "Number"}],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Set pixel color using colorwheel: 0-255"
    },
    {
        "type": "ib_servo_setup",
        "message0": "Set up Servo %1 on pin %2",
        "args0": [
            {"type": "field_variable", "name": "SERVO_VAR", "variable": "myServo"},
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ["IO4", "board.IO4"], ["IO5", "board.IO5"], ["IO6", "board.IO6"],
                    ["IO7", "board.IO7"], ["IO8", "board.IO8"], ["IO9", "board.IO9"],
                    ["IO10", "board.IO10"], ["IO11", "board.IO11"], ["IO16", "board.IO16"],
                    ["IO17", "board.IO17"], ["IO18", "board.IO18"], ["IO19", "board.IO19"],
                    ["IO21", "board.IO21"], ["IO33", "board.IO33"], ["IO34", "board.IO34"],
                    ["IO35", "board.IO35"], ["IO38", "board.IO38"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Create a servo on the specified pin"
    },
    {
        "type": "ib_servo_angle",
        "message0": "Set %1 angle to %2 degrees",
        "args0": [
            {"type": "field_variable", "name": "SERVO_VAR", "variable": "myServo"},
            {"type": "input_value", "name": "ANGLE", "check": "Number"}
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Set servo angle: 0 to 180 degrees"
    },
    {
        "type": "ib_digital_in_setup",
        "message0": "Set up Digital Input %1 on pin %2 pull %3",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myInput"},
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ["IO4","board.IO4"],["IO5","board.IO5"],["IO6","board.IO6"],
                    ["IO7","board.IO7"],["IO8","board.IO8"],["IO9","board.IO9"],
                    ["IO10","board.IO10"],["IO11","board.IO11"],["IO16","board.IO16"],
                    ["IO17","board.IO17"],["IO18","board.IO18"],["IO19","board.IO19"],
                    ["IO21","board.IO21"],["IO27","board.IO27"],["IO33","board.IO33"],
                    ["IO34","board.IO34"],["IO35","board.IO35"],["IO38","board.IO38"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PULL",
                "options": [
                    ["Up", "ib.UP"], ["Down", "ib.DOWN"], ["None", "None"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Create a digital input pin with optional pull resistor"
    },
    {
        "type": "ib_digital_in_read",
        "message0": "%1 value",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myInput"}
        ],
        "output": "Boolean",
        "colour": 200,
        "tooltip": "Read the value of a digital input (True or False)"
    },
    {
        "type": "ib_digital_out_setup",
        "message0": "Set up Digital Output %1 on pin %2",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myOutput"},
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ["IO4","board.IO4"],["IO5","board.IO5"],["IO6","board.IO6"],
                    ["IO7","board.IO7"],["IO8","board.IO8"],["IO9","board.IO9"],
                    ["IO10","board.IO10"],["IO11","board.IO11"],["IO16","board.IO16"],
                    ["IO17","board.IO17"],["IO18","board.IO18"],["IO19","board.IO19"],
                    ["IO21","board.IO21"],["IO27","board.IO27"],["IO33","board.IO33"],
                    ["IO34","board.IO34"],["IO35","board.IO35"],["IO38","board.IO38"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Create a digital output pin"
    },
    {
        "type": "ib_digital_out_write",
        "message0": "Set %1 to %2",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myOutput"},
            {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [["True", "True"], ["False", "False"]]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Set a digital output to True (HIGH) or False (LOW)"
    },
    {
        "type": "ib_analog_in_setup",
        "message0": "Set up Analog Input %1 on pin %2",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myAnalog"},
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ["IO1","board.IO1"],["IO2","board.IO2"],["IO3","board.IO3"],
                    ["IO4","board.IO4"],["IO5","board.IO5"],["IO6","board.IO6"],
                    ["IO7","board.IO7"],["IO8","board.IO8"],["IO9","board.IO9"],
                    ["IO10","board.IO10"],["IO11","board.IO11"],["IO33","board.IO33"],
                    ["IO34","board.IO34"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "Create an analog input pin (returns 0–65535)"
    },
    {
        "type": "ib_analog_in_read",
        "message0": "%1 value",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myAnalog"}
        ],
        "output": "Number",
        "colour": 40,
        "tooltip": "Read the analog value (0–65535)"
    },
    {
        "type": "ib_analog_out_setup",
        "message0": "Set up Analog Output %1 on pin %2",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myDAC"},
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ["IO25", "board.IO25"], ["IO26", "board.IO26"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "Create an analog output (DAC) pin — IO25 or IO26 only"
    },
    {
        "type": "ib_analog_out_write",
        "message0": "Set %1 to %2",
        "args0": [
            {"type": "field_variable", "name": "PIN_VAR", "variable": "myDAC"},
            {"type": "input_value", "name": "VALUE", "check": "Number"}
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 40,
        "tooltip": "Set DAC output value (0–65535, where 32768 ≈ 1.65V)"
    },
    {
        "type": "ib_map_range",
        "message0": "Map %1 from %2 – %3 to %4 – %5",
        "args0": [
            {"type": "input_value", "name": "VALUE", "check": "Number"},
            {"type": "field_number", "name": "IN_MIN", "value": 0},
            {"type": "field_number", "name": "IN_MAX", "value": 65535},
            {"type": "field_number", "name": "OUT_MIN", "value": 0},
            {"type": "field_number", "name": "OUT_MAX", "value": 180}
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": 40,
        "tooltip": "Scale a value from one range to another (e.g. analog 0–65535 → angle 0–180)"
    },
    {
        "type": "ib_event_state",
        "message0": "Event is %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    ["pressed", "pressed"],
                    ["released", "released"]
                ]
            }
        ],
        "output": "Boolean",
        "colour": 65
    }
]);
