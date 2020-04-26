export const severe_symptoms = [
    {
        "label":"I am the:",
        "name": "is_actually_patient",
        "type": "radio",
        "options":[
            {
                "label":"Patient",
                "value":"patient"
            },
            {
                "label":"Patient's Representative",
                "value":"not_patient"
            }
        ],
        "comment":"",
        "required":true
    },
    {
        "label":"Check all symptoms that apply",
        "type":"label"
    },
    {
        "label":"Severe difficulty breathing",
        "name": "severe_breathing",
        "type": "boolean",
        "value": false,
        "comment":"Severe symptoms (call 911!)",
        "required":false
    },
    {
        "label":"Severe chest pain",
        "name": "severe_chest",
        "type": "boolean",
        "value": false,
        "comment":"Severe symptoms (call 911!)",
        "required":false
    },
    {
        "label":"New onset of confusion",
        "name": "patient_is_confused",
        "type": "boolean",
        "value": false,
        "comment":"Severe symptoms (call 911!)",
        "required":false
    },
    {
        "label":"Blue-colored face or lips",
        "name": "blue_lips",
        "type": "boolean",
        "value": false,
        "comment": "Severe symptoms (call 911!)",
        "required":false
    }
];

export const other_symptoms = [
    {
        "label":"Check all symptoms that apply",
        "type":"label"
    },
    {
        "label":"Fever",
        "name": "fever",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"New onset of cough",
        "name": "new_cough",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Sore throat",
        "name": "sore_throat",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Difficult breathing",
        "name": "difficult_breathing",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Chills or shaking",
        "name": "chills",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Body aches",
        "name": "body_aches",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Headache",
        "name": "head_aches",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Loss of smell or taste",
        "name": "cannot_smell",
        "type": "boolean",
        "value": false,
        "comment": "Less severe symptoms (sucks to be you!)",
        "required":false
    },
    {
        "label":"Please answer a few additional questions",
        "type":"label"
    },
    {
        "label":"Have you or any of your close contacts been exposed to anyone diagnosed with COVID-19?",
        "name": "contact_with_positives",
        "type":"radio",
        "options":[
            {
                "label":"No",
                "value":"0"
            },
            {
                "label":"Within 14 Days",
                "value":"2"
            },
            {
                "label":"Greater than 14 days ago",
                "value":"3"
            },
            {
                "label":"I'm not sure",
                "value":"1"
            }

        ],
        "value": "",
        "comment": "Don't talk to strangers",
        "required":true
    },
    {
        "label":"Have you or any of your close contacts with traveled outside of the United States in the last 14 days?",
        "name": "left_murica",
        "value": "",
        "type":"radio",
        "options":[
            {
                "label":"No",
                "value":"0"
            },
            {
                "label":"Yes",
                "value":"2"
            },
            {
                "label":"I'm not sure",
                "value":"1"
            }

        ],
        "comment": "Don't talk to strangers",
        "required":true
    }
];