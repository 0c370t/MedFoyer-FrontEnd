import TimePicker from '../src/Components/TimePicker/TimePicker.svelte'

export default {
    Component: TimePicker,
    title: "Time Picker"
}

export const Default = () => ({
    Component:TimePicker
});


export const WithStep = () => ({
    Component: TimePicker,
    props: {
        step: 15
    }
});

let unevenStep = new Date();
unevenStep.setMinutes(31);
export const WithUnevenInput = () => ({
    Component:TimePicker,
    props: {
        step: 15,
        value: unevenStep
    }
})

let WithStart_Prop = new Date();
WithStart_Prop.setHours(8, 0);
export const WithStart = () => ({
    Component: TimePicker,
    props: {
        start: WithStart_Prop
    }
});

let WithEnd_Prop = new Date();
WithEnd_Prop.setHours(17, 0);
export const WithEnd = () => ({
    Component: TimePicker,
    props: {
        end: WithEnd_Prop
    }
});

export const WithStartAndEnd = () => ({
    Component: TimePicker,
    props: {
        start: WithStart_Prop,
        end: WithEnd_Prop
    }
})
