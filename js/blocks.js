// --- BLOCK DEFINITIONS ---
Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "ib_pixel",
        "message0": "Set IdeaBoard Pixel to %1",
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
        "type": "time_sleep",
        "message0": "Wait %1 seconds",
        "args0": [{"type": "field_number", "name": "SECONDS", "value": 1}],
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
            {"type": "field_number", "name": "MOTOR1", "value": 0, "min": -1, "max": 1, "precision": 0.01},
            {"type": "field_number", "name": "MOTOR2", "value": 0, "min": -1, "max": 1, "precision": 0.01}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Set motor speed: 1.0 = full forward, -1.0 = full reverse, 0 = brake"
    },
    {
        "type": "ib_brightness",
        "message0": "Set Pixel Brightness %1",
        "args0": [
            {"type": "field_number", "name": "BRIGHTNESS", "value": 0.3, "min": 0, "max": 1, "precision": 0.01}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Set pixel brightness: 0.0 = off, 1.0 = full brightness"
    },
    {
        "type": "ib_arcoiris",
        "message0": "Set Pixel Rainbow Color %1",
        "args0": [
            {"type": "field_number", "name": "VALUE", "value": 0, "min": 0, "max": 255, "precision": 1}
        ],
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
            {"type": "field_number", "name": "ANGLE", "value": 90, "min": 0, "max": 180, "precision": 1}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Set servo angle: 0 to 180 degrees"
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
