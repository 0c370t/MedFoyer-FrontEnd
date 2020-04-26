<script>
    export let appt;
    export let active = false;
    console.log(appt.appointment_time);
    appt.appointment_time = new Date(appt.appointment_time * 1000);

    const formatDate = (date) => {
        console.log(date);
        let ampm = "pm";
        if(date.getHours() < 12){
            ampm = "am";
        }
        let minutes = '';
        if(date.getMinutes() < 10){
            minutes = `0${date.getMinutes()}`;
        } else {
            minutes = `${date.getMinutes()}`;
        }



        return `${date.getHours() % 12}:${minutes} ${ampm}`;
    }
</script>

<div class="uk-box-shadow-hover-medium" on:click class:active>
    <h4 class="uk-margin-remove">
        {appt.name}
    </h4>
    <p class="uk-margin-remove">
        {formatDate(appt.appointment_time)}
    </p>
    <p class="uk-margin-remove">
        {appt.status}
    </p>
    <hr/>
</div>

<style>
    div {
        height: 8em;
        padding:1em;
        background-color:rgba(255,255,255,0.7);
        cursor:pointer;
    }
    .active{
        background-color:rgba(255,255,255,0.5);
    }
    p{
        height:1em;
    }
    hr{
        margin-top:2em;
        margin-bottom:0;
    }
</style>