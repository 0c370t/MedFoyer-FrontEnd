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