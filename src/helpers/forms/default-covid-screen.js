import state_options from "../mapping/state_options";
import {getCurrentDateForInput} from "../datetime";

export const severe_symptoms = [
    {
        "label": "I am the:",
        "name": "is_actually_patient",
        "type": "radio",
        "options": [
            {
                "label": "Patient",
                "value": "patient"
            },
            {
                "label": "Patient's Representative",
                "value": "not_patient"
            }
        ],
        "required": true,
    },
    {
        "label": "Check all symptoms that apply",
        "type": "label",
        "name": "check_all_that_apply_1"
    },
    {
        "label": "Severe difficulty breathing",
        "name": "severe_breathing",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "HIGH_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Severe chest pain",
        "name": "severe_chest",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "HIGH_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "New onset of confusion",
        "name": "patient_is_confused",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "HIGH_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Blue-colored face or lips",
        "name": "blue_lips",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "HIGH_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            },
        ]
    }
];

export const other_symptoms = [
    {
        "label": "Check all symptoms that apply",
        "type": "label",
        "name": "check_all_that_apply_2"
    },
    {
        "label": "Fever",
        "name": "fever",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "New onset of cough",
        "name": "new_cough",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Sore throat",
        "name": "sore_throat",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Difficult breathing",
        "name": "difficult_breathing",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Chills or shaking",
        "name": "chills",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Body aches",
        "name": "body_aches",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Headache",
        "name": "head_aches",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Loss of smell or taste",
        "name": "cannot_smell",
        "type": "boolean",
        "value": false,
        "required": false,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    true
                ],
                "priority": 10
            }
        ]
    },
    {
        "label": "Please answer a few additional questions",
        "type": "label",
        "name":"additional"
    },
    {
        "label": "Have you or any of your close contacts been exposed to anyone diagnosed with COVID-19?",
        "name": "contact_with_positives",
        "type": "radio",
        "options": [
            {
                "label": "No",
                "value": "0"
            },
            {
                "label": "Within 14 Days",
                "value": "2"
            },
            {
                "label": "Greater than 14 days ago",
                "value": "3"
            },
            {
                "label": "I'm not sure",
                "value": "1"
            }

        ],
        "value": "",
        "required": true,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    "1","2","3"
                ],
                "priority": 5
            },
        ]
    },
    {
        "label": "Have you or any of your close contacts with traveled outside of the United States in the last 14 days?",
        "name": "left_the_country",
        "value": "",
        "type": "radio",
        "options": [
            {
                "label": "No",
                "value": "0"
            },
            {
                "label": "Yes",
                "value": "2"
            },
            {
                "label": "I'm not sure",
                "value": "1"
            }

        ],
        "required": true,
        "flags":[
            {
                "state": "AT_RISK",
                "flaggable_answers": [
                    "3","2","1"
                ],
                "priority": 5
            },
        ]
    }
];

