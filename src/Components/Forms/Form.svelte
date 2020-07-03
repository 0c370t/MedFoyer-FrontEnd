<script>
    import Button from '../Button/Button.svelte';
    import DatePicker from "../DatePicker/DatePicker.svelte";
    import Callout from "../Callout/Callout.svelte";
    import PatientPicker from "./Controls/PatientPicker.svelte";
    import TimePicker from "../TimePicker/TimePicker.svelte";
    import {phoneClean} from "../../helpers/phone_numbers";
    import {dateClean} from "../../helpers/datetime";
    import LocationPicker from "./Controls/LocationPicker.svelte";
    import PractitionerPicker from "./Controls/PractitionerPicker.svelte";
    import Icon from "../Icon/Icon.svelte";
    import {onDestroy, onMount} from "svelte";
    import QuestionLabel from "./Controls/QuestionLabel.svelte";
    import OptionLabel from "./Controls/OptionLabel.svelte";

    export let form;
    export let onSubmit;
    export let formElement = null;
    export let buttonText = "Submit";
    export let loading = false;
    export let validationMessage = "";
    export let _class = "";
    export let fullwidth = true;
    export let i18n = false;
    export let i18nDictionary = {};
    let unsub = () => {};
    let _ = () => {};
    onMount(async () => {
        if (i18n) {
            let svelteI18n =await import("svelte-i18n");
            Object.keys(i18nDictionary).forEach(key => {
                svelteI18n.addMessages(key, i18nDictionary[key])
            });

            unsub = svelteI18n._.subscribe(v => _ = v);
        }
    });
    onDestroy(() => unsub());

</script>
<form bind:this={formElement} class={"uk-container uk-width-1-1 " + _class}>
    {#each form as question (question.name)}
        {#if question.type !== "hidden"}
            <div class="field {question.type} uk-position-relative">
                {#if question.type === "boolean"}
                    <QuestionLabel {question} {i18n}/>
                    <input name="{question.name}" type="checkbox" class="uk-checkbox input {question.type}"
                           bind:checked={question.value} required={question.required}/>
                {:else if question.type === "radio"}
                    <QuestionLabel {question} {i18n}/>
                    <div class="radioContainer">
                        {#each question.options as option}
                            <span class="radioOption">
                                <OptionLabel {option} {question} {i18n}/>
                                <input name="{question.name}" type="radio" class="uk-radio input {question.type}"
                                       bind:group={question.value} value="{option.value}"
                                       required="{question.required}"/>
                            </span>
                        {/each}
                    </div>
                {:else if question.type === "dropdown"}
                    <QuestionLabel {question} {i18n}/>
                    <select class="uk-select input {question.type}" required="{question.required}"
                            bind:value={question.value}>
                        <option></option>
                        {#each question.options as option}
                            <option value="{option.value}">{option.label}</option>
                        {/each}
                    </select>
                {:else if question.type === "label"}
                    <label class="labelfield">
                        <strong>
                            {#if i18n}
                                {_(`form.${question.name}`)}
                            {:else}
                                {question.label}
                            {/if}
                        </strong>
                        <hr/>
                    </label>
                {:else if question.type === "text"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="text" class="uk-input field {question.type}" bind:value={question.value}
                           name="{question.name}" required="{question.required}"/>
                {:else if question.type === "number"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="number" class="uk-input field {question.type}" bind:value={question.value} step="any"
                           name="{question.name}" required="{question.required}"/>
                {:else if question.type === "datetime"}
                    <QuestionLabel {question} {i18n}/>
                    <div class="{question.type} uk-flex uk-flex-column uk-flex-1">
                        <TimePicker fullwidth={true} bind:value={question.value} step="{question.minute_step || 1}"/>
                        <DatePicker fullwidth={true} flex="{true}" start="{question.start || new Date(1970,1,1)}"
                                    bind:value={question.value}/>
                    </div>
                {:else if question.type === "date"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="date" class="uk-input field {question.type}" bind:value={question.value}
                           name="{question.name}" required="{question.required}"/>
                {:else if question.type === "date-pasteable"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="text" class="uk-input field {question.type}" bind:value={question.value}
                           name="{question.name}" required="{question.required}" pattern={'[\\d]{2}/[\\d]{2}/[\\d]{4}'}
                           placeholder="MM/DD/YYYY" on:change={()=>question.value = dateClean(question.value)}/>
                {:else if question.type === "datepicker"}
                    <QuestionLabel {question} {i18n}/>
                    <div class="{question.type} uk-flex uk-flex-column">
                        <DatePicker fullwidth={false} flex="{true}" bind:value={question.value}/>
                    </div>
                {:else if question.type === "time"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="time" class="uk-input field {question.type}" bind:value={question.value}
                           name="{question.name}" required="{question.required}"/>
                {:else if question.type === "phone"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="tel" pattern={`\\(?[0-9]{3}\\)?-?[0-9]{3}-?[0-9]{4}`} placeholder="(000)-000-0000"
                           class="uk-input field {question.type}" bind:value={question.value}
                           on:change={() => question.value = phoneClean(question.value)} name="{question.name}"
                           required="{question.required}"/>
                {:else if question.type === "email"}
                    <QuestionLabel {question} {i18n}/>
                    <input type="email" class="uk-input field {question.type}" bind:value={question.value}
                           name="{question.name}" required="{question.required}"/>
                {:else if question.type === "patient"}
                    <PatientPicker name={question.name} bind:value={question.value} label={question.label}
                                   required={question.required} type={question.type}/>
                {:else if question.type === "location"}
                    <LocationPicker name={question.name} bind:value={question.value} label={question.label}
                                    required={question.required} type={question.type}/>
                {:else if question.type === "practitioner"}
                    <PractitionerPicker name={question.name} bind:value={question.value} label={question.label}
                                        required={question.required} type={question.type}/>
                {/if}
                {#if question.message}
                    <Callout position="right" }>{question.message}</Callout>
                {/if}
            </div>
        {/if}
    {/each}
    <div class="buttonContainer">
        <label class="labelfield uk-label-danger">
            <strong>{validationMessage}</strong>
        </label>
        <Button {fullwidth} {loading} on:click={onSubmit}>{buttonText}</Button>
    </div>
</form>
<style lang="scss">
    @import 'forms';
</style>