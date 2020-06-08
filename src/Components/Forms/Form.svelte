<script>
    import Button from '../Button/Button.svelte';

    export let form;
    export let onSubmit;
    export let formElement;
    export let buttonText = "Submit";
    export let loading = false;
</script>
<form bind:this={formElement} class="uk-container uk-width-1-1">
    {#each form as question}
        <div class="field {question.type}">
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
            {#if question.type === "validation-message"}
                <label class="labelfield uk-label-danger">
                    <strong>{question.label}</strong>
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
                <input type="datetime-local" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "date"}
                <label for="{question.name}">{question.label}</label>
                <input type="date" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "time"}
                <label for="{question.name}">{question.label} </label>
                <input type="time" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
            {#if question.type === "phone"}
                <label for="{question.name}">{question.label} </label>
                <input type="tel" pattern={`[0-9]{3}-?[0-9]{3}-?[0-9]{4}`} placeholder="000-000-0000" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}

            {#if question.type === "email"}
                <label for="{question.name}">{question.label} </label>
                <input type="email" class="uk-input field {question.type}" bind:value={question.value}
                       name="{question.name}" required="{question.required}"/>
            {/if}
        </div>
    {/each}
    <div class="buttonContainer">
        <Button fullwidth={true} {loading} on:click={onSubmit}>{buttonText}</Button>
    </div>
</form>
<style lang="scss">

    form {
        margin-top: 2em;
        font-size: 1.2em;
    }

    div.field {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-between;

        &.radio {
            flex-direction: column;
        }

        > label {
            flex: 1;
            font-size: 1.1em;
        }

        .radioContainer {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .radioOption {
                display: flex;
                justify-content: center;

                input {
                    margin-left: 1em;
                }
            }
        }

        input.radio, input.boolean {
            width: 2em;
            height: 2em;
            margin-bottom: 1em;
            display: inline-block;
        }

        input.radio {
            background-size: 150%;
        }

        input.boolean {
            background-size: 80%;
        }

        input:not(.radio):not(.boolean), select {
            flex: 1;
        }
    }

    div.buttonContainer {
        flex: 1;
        width: 80%;
        display: flex;
        justify-content: center;
        margin: 0 auto 2em;
    }

</style>