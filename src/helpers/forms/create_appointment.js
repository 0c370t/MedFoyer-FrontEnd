import state_options from "../mapping/state_options";

export const new_appointment = [
    {
        "label":"Patient Name",
        "type":"text",
        "name":"name",
        "required": true
    },
    {
        "label":"Patient Date of Birth",
        "type":"date",
        "name":"dob",
        "required":true
    },
    {
        "label":"Patient Phone Number",
        "type":"phone",
        "name":"phone_num",
        "required":true
    },
    {
        "label":"Appointment Time",
        "type":"time",
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