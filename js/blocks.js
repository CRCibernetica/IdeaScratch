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
