import state_options from "../mapping/state_options";

export const new_appointment = [
    {
        "label":"Patient",
        "type":"patient",
        "name":"patient",
        "required":true
    },
    {
        "label":"Appointment Time",
        "type":"datetime",
        "name":"appointment_time",
        "required": true
    },
    {
        "label":"Street Address",
        "type":"text",
        "name":"address_1",
        "required": true
    },
    {
        "label":"City",
        "type":"text",
        "name":"city",
        "required": true
    },
    {
        "label":"State",
        "type":"dropdown",
        "name":"state",
        "required":true,
        "options":state_options
    },
    {
        "label":"Zip Code",
        "type":"number",
        "name":"zip",
        "required":true
    }
];