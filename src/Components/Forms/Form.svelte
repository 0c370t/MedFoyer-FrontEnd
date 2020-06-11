<script>
    import Button from '../Button/Button.svelte';
    import DatePicker from "../DatePicker/DatePicker.svelte";
    import Callout from "../Callout/Callout.svelte";
    import PatientPicker from "./Controls/PatientPicker.svelte";
    import TimePicker from "../TimePicker/TimePicker.svelte";

    export let form;
    export let onSubmit;
    export let formElement;
    export let buttonText = "Submit";
    export let loading = false;
    export let validationMessage = "";
    const phoneClean = (value) => {
        let phone = value.replace(/\D/g, '');
        const match = phone.match(/(\d{1,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            phone = `(${match[1]})${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
        }
        return phone
    }

</script>
<form bind:this={formElement} class="uk-container uk-width-1-1">
    {#each form as question}
        <div class="field {question.type} uk-position-relative">
            {#if question.type === "boolean"}
                <label for="{question.name}">{question.label} </label>
                <input name="{question.name}" type="checkbox" class="uk-checkbox input {question.type}"
                       bind:checked={question.value} required={question.required}/>
            {/if}

            {#if question.type === "radio"}
                <label>{question.label}</label>
                <div class="radioContainer">
                    {#each question.options as option}
                        <span class="radioOption">
                                <label>{option.label}</label>
                                       bind:group={question.value} value="{option.value}" required={question.required}/>
                                <input name="{question.name}" type="radio" class="uk-radio input {question.type}"/>
                            </span>
                    {/each}
                </div>
            {/if}

            {#if question.type === "dropdown"}
                <label>{question.label}</label>
                <select class="uk-select input {question.type}">
                    {#each question.options as option}
                        <option value="{option.value}">{option.label}</option>
                    {/each}
                </select>
            {/if}
            {#if question.type === "label"}
                <label class="labelfield">
                    <strong>{question.label}</strong>
                    <hr/>
                </label>
            {/if}
            {#if question.type === "text"}
                <label for="{question.name}">{question.label} </label>
                <input type="text" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "number"}
                <label for="{question.name}">{question.label} </label>
                <input type="number" class="uk-input field {question.type}" bind:value={question.value} step="any"
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "datetime"}
                <label for="{question.name}">{question.label} </label>
                <div class="{question.type} uk-flex uk-flex-column uk-flex-1">
                    <TimePicker fullwidth={true} bind:value={question.value}/>
                    <DatePicker fullwidth={true} flex="{true}" bind:value={question.value}/>
                </div>
            {/if}
            {#if question.type === "date"}
                <label for="{question.name}">{question.label}</label>
                <input type="date" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type ==="datepicker"}
                <label for="{question.name}">{question.label} </label>
                <div class="{question.type} uk-flex uk-flex-column">
                    <DatePicker fullwidth={false} flex="{true}" bind:value={question.value}/>
                </div>
            {/if}
            {#if question.type === "time"}
                <label for="{question.name}">{question.label} </label>
                <input type="time" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "phone"}
                <label for="{question.name}">{question.label} </label>
                <input type="tel" pattern={`\\(?[0-9]{3}\\)?-?[0-9]{3}-?[0-9]{4}`} placeholder="(000)-000-0000"
                       class="uk-input field {question.type}" bind:value={question.value}
                       on:change={() => question.value = phoneClean(question.value)} name="{question.name}"
                       required="{question.required}"/>
            {/if}
            {#if question.type === "email"}
                <label for="{question.name}">{question.label} </label>
                <input type="email" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "patient"}
                <PatientPicker bind:question/>
            {/if}


            {#if question.message}
                <Callout position="right" }>{question.message}</Callout>
            {/if}
        </div>
    {/each}
    <div class="buttonContainer">
        <label class="labelfield uk-label-danger">
            <strong>{validationMessage}</strong>
        </label>
        <Button fullwidth={true} {loading} on:click={onSubmit}>{buttonText}</Button>
    </div>
</form>
<style lang="scss">
    @import 'forms';
</style>