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
    },
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
    }
];

export const i18nDictionary = {
    "en":{
        "form": {
            "is_actually_patient": "I am the:",
            "check_all_that_apply_1": "Check all symptoms that apply",
            "severe_breathing": "Severe difficulty breathing",
            "severe_chest": "Severe chest pain",
            "patient_is_confused": "New onset of confusion",
            "blue_lips": "Blue-colored face or lips",
            "contact_with_positives": "Have you or any of your close contacts been exposed to anyone diagnosed with COVID-19?",
            "left_the_country": "Have you or any of your close contacts with traveled outside of the United States in the last 14 days?",


            "check_all_that_apply_2": "Check all symptoms that apply",
            "fever": "Fever",
            "new_cough": "New onset of cough",
            "sore_throat": "Sore throat",
            "difficult_breathing": "Difficult breathing",
            "chills": "Chills or shaking",
            "body_aches": "Body aches",
            "head_aches": "Headache",
            "cannot_smell": "Loss of smell or taste",


            "options": {
                "is_actually_patient": {
                    "patient": "Patient",
                    "not_patient": "Patient's Representative"
                },
                "contact_with_positives": {
                    "0": "No",
                    "1": "I'm not sure",
                    "2": "Within 14 Days",
                    "3": "Greater than 14 days ago"
                },
                "left_the_country": {
                    "0": "No",
                    "1": "I'm not sure",
                    "2": "Yes"
                }
            }
        }
    },
    "es":{
        "form": {
            "is_actually_patient": "Soy el:",
            "check_all_that_apply_1": "Marque todos los síntomas que apliquen",
            "severe_breathing": "Dificultad severa para respirar",
            "severe_chest": "Dolor de pecho severo",
            "patient_is_confused": "Nuevo comienzo de confusión",
            "blue_lips": "Cara o labios de color azul",
            "contact_with_positives": "¿Usted o alguno de sus contactos cercanos ha estado expuesto a alguien diagnosticado con COVID-19?",
            "left_the_country": "¿Ha viajado usted o alguno de sus contactos cercanos fuera de los Estados Unidos en los últimos 14 días?",

            "check_all_that_apply_2": "Marque todos los síntomas que apliquen",
            "fever": "Fiebre",
            "new_cough": "Nuevo inicio de tos",
            "sore_throat": "Dolor de garganta",
            "difficult_breathing": "Respiración dificultosa",
            "chills": "Escalofríos o temblores",
            "body_aches": "Dolor de cuerpo",
            "head_aches": "Dolor de cabeza",
            "cannot_smell": "Pérdida del olfato o del gusto.",

            "options": {
                "is_actually_patient": {
                    "patient": "Paciente",
                    "not_patient": "Representante del paciente"
                },
                "contact_with_positives": {
                    "0": "No",
                    "1": "No estoy seguro",
                    "2": "Dentro de 14 días",
                    "3": "Hace más de 14 días"
                },
                "left_the_country": {
                    "0": "No",
                    "1": "No estoy seguro",
                    "2": "Si"
                }
            }
        }
    }
};