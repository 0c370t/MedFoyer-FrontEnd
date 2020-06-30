<script context="module">
    export const inputTemplate = () => (
            {
                value: "",
                valid: true,
                message: ""
            }
    );
    // This line is designed to prevent short-circuiting, to validate all fields rather than failing on just 1
    export const validateMany = (inputs) => ![...inputs.map(i => i.validate())].includes(false);
</script>

<script>
    import Callout from "../../Callout/Callout.svelte";
    import Icon from "../../Icon/Icon.svelte";
    import {onMount} from "svelte";

    export let input = inputTemplate();
    onMount(() => {
        input.validate = () => {
            input.message = "";
            if (input.value === "") {
                input.valid = false;
                input.message = "Please fill out this field";
                return false;
            }
            return true;
        };
    });

    export let icon = "check";
    export let placeholder = "Placeholder";
    export let type = "text";
    export let disabled = false;
    if (type !== "text" && type !== "password" && type !== "email") type = "text";

    $: if (!input.valid) setTimeout(() => input.valid = true, 1000);

    const handleInput = (e) => input.value = e.target.value;
</script>

<div class="uk-margin-small">
    <div class="uk-inline uk-width-1-1" class:shake={!input.valid}>
        <Callout position="left" visible={Boolean(input.message)} dark={false}>
            {input.message}
        </Callout>
        <Icon _class="uk-form-icon uk-form-icon-flip" {icon}/>
        <input class="uk-input uk-border-pill" required {placeholder} {type} value={input.value} on:input={handleInput} {disabled} class:uk-disabled={disabled}>
    </div>
</div>