<script>
    import DatePicker from 'svelte-calendar';
    import Icon from "../Icon/Icon.svelte";
    import Button from '../Button/Button.svelte';
    export let value = new Date();
    export let _class = "";
    export let fullwidth = true;
    export let flex = false;
    export let start = false;
    export let end = false;

    let temp_value = new Date(value.getTime());
    $: if(temp_value){
        value.setFullYear(temp_value.getFullYear(), temp_value.getMonth(), temp_value.getDate());
        value = value;
    }

    let formattedSelected = '';

    let _start = start ? new Date(start.getTime()) : new Date(1980, 0, 1);
    let _end = end ? new Date(end.getTime()) : new Date(2020, 8, 1);

    $: _start = start ? new Date(start.getTime()) : new Date(1980, 0, 1);
    $: _end = end ? new Date(end.getTime()) : new Date(2020, 8, 1);
</script>

<DatePicker bind:formattedSelected style={`${fullwidth ? "width:100%;" : ""} ${flex ? "flex:1;" : ""}`} bind:selected={temp_value}
            dayHighlightedBackgroundColor="#3E5867"
            dayHighlightedTextColor="#FFF"
            highlightColor="#3E5867"
            start={_start}
            end={_end}

>
    <Button {fullwidth} {_class}>
        <Icon icon="calendar" _class="uk-margin-small-right"/>
        <span>
            {formattedSelected}
        </span>
    </Button>
</DatePicker>