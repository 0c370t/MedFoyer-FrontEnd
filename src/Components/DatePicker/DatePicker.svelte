<script>
    import DatePicker from 'svelte-calendar';
    import Icon from "../Icon/Icon.svelte";
    import Button from '../Button/Button.svelte';
    export let value = new Date();
    $: if(value) console.log(value);
    let formattedSelected = '';
</script>

<DatePicker bind:formattedSelected style="width:100%;" bind:selected={value}
            dayHighlightedBackgroundColor="#3E5867"
            dayHighlightedTextColor="#FFF"
            highlightColor="#3E5867"
>
    <Button fullwidth={true}>
        <Icon icon="calendar" _class="uk-margin-small-right"/>
        <span>
            {formattedSelected}
        </span>
    </Button>
</DatePicker>