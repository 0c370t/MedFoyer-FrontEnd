import Drop from '../src/Components/Drop/Drop.svelte';

export default {
    Component: Drop,
    title: "Drop (Toggle Panel)"
}

export const Default = () => (
    {
        Component: Drop
    }
);
export const Flip = () => (
    {
        Component: Drop,
        props: {
            flip: true
        }
    }
);