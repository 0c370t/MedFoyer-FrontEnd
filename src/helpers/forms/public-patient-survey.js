export const questions = [
    {
        "label": "In general, how long do you usually wait before seeing your doctor, in minutes?",
        "name": "avg_wait_time",
        "type": "number",
        "required": true
    },
    {
        "label": "In light of the COVID-19 pandemic and social distancin, where would you most prefer to wait for your medical appointment?",
        "name": "preferred_waiting_area",
        "type": "radio",
        "required": true,
        "options": [
            {
                "label": "Waiting Room",
                "value": "waiting room"
            },
            {
                "label": "Personal Vehicle",
                "value": "personal vehicle"
            },
            {
                "label": "Nearby Business, Cafe, or Restaurant",
                "value": "nearby business"
            }
        ]
    },
    {
        "label": "Please elaborate on your location preference. Why there?",
        "name": "preferred_waiting_area_extra",
        "type":"text",
        "required":false
    },
    {
        "label":"We are working on a solution to help patients visiting their doctor by allowing them to check-in while waiting in the car. Are you willing to try that app and provide feedback?",
        "name":"beta_tester",
        "type":"boolean",
        "required":true
    },
    {
        "label":"If yes, what is your email address?",
        "name":"contact_email",
        "type":"email",
        "required":false
    }
];