<script>
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import Button from "../../Components/Button/Button.svelte";
    import {navigate} from "svelte-routing";
    import {patient_meta} from "../../helpers/stores";
    import {getAuthToken} from "../../API/patient.API";
    import {padMinutes, toAWSDate} from "../../helpers/datetime";
    import {_} from 'svelte-i18n';

    let day, month, year;
    let dayElem, monthElem, yearElem;
    let validationText = "";
    let loading = false;
    const onSubmit = async () => {
        loading = true;
        if (!day || !month || !year) {
            validationText = $_("AuthenticationPage.validationText");
        } else {
            try {
                let response = await getAuthToken(`${year}-${padMinutes(month)}-${padMinutes(day)}`, $patient_meta.token.id);
                if (!response.ok) {
                    response.json().then(r => {
                        validationText = r;
                        loading = false;
                    });
                } else {
                    response.json().then(r => {
                        $patient_meta.jwt = r;
                        $patient_meta.state = "GPS";
                        navigate("/patient/map");
                    });
                }
            } catch (e) {
                console.log(e);
                validationText = $_("error");
                loading = false;
            }
        }
        loading = false;
    };

    const moveToDay = () => {
        if (typeof month === "undefined") return;
        if (month > 1 && month < 10) {
            month = "0" + month;
            dayElem.focus();
        } else if (month > 12) {
            month = 12;
            dayElem.focus();
        } else if (month.toString().length === 2) {
            dayElem.focus();
        }
    };
    const moveToYear = () => {
        if (typeof day === "undefined") return;
        if (day > 3 && day < 10) {
            day = "0" + day;
            yearElem.focus();
        } else if (day > 31) {
            day = 31;
            yearElem.focus();
        } else if (day.toString().length === 2) {
            yearElem.focus();
        }
    };
    const blurYear = () => {
        if (typeof year === "undefined") return;
        if (year.toString().length === 4) {
            yearElem.blur();
        }
    }
</script>

<MobileHeader/>
<main class="uk-container uk-container-small uk-margin-large-top uk-text-center">
    <h3 class="uk-heading-medium">{$_('AuthenticationPage.header')}</h3>
    <hr/>
    <p>
        {$_('AuthenticationPage.text')}
    </p>
    <label class="uk-text-danger">{validationText}</label>
    <div class="uk-flex uk-width-3-4 uk-align-center">
        <input type="number" class="uk-input uk-width-1-4" bind:this={monthElem} bind:value={month} name="month"
               required="true" placeholder="MM" min="1" max="12" on:keyup={moveToDay} on:blur={padMinutes}/>
        <input type="number" class="uk-input uk-width-1-4" bind:this={dayElem} bind:value={day} name="day"
               required="true" placeholder="DD" min="1" max="31" on:keyup={moveToYear} on:blur={padMinutes}/>
        <input type="number" class="uk-input uk-flex-1" bind:this={yearElem} bind:value={year} name="year"
               required="true" placeholder="YYYY" min="1950" max={new Date().getFullYear()} on:keyup={blurYear}/>
    </div>
    <Button fullwidth="true" _class="uk-margin-medium-top" on:click={onSubmit} {loading}>
        <span class="uk-margin-small-right">{$_("submit")}</span>
        <Icon options={{icon:"check"}}/>
    </Button>
</main>
<style>

</style>