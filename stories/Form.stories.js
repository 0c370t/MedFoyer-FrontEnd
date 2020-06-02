import Form from '../src/Components/Forms/Form.svelte'
import {severe_symptoms} from '../src/helpers/questions';
import TogglePanel from "../src/Components/TogglePanel/TogglePanel.svelte";


export default {
    Component: Form,
    title: "Form Component"
};

export const Default = () => ({
    Component: Form,
    props: {
        form: severe_symptoms,
        onSubmit: () => {}
    }
});

