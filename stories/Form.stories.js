import Form from '../src/Components/Forms/Form.svelte'
import {severe_symptoms} from '../src/helpers/forms/default-covid-screen';


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

