<script>
    import SingleColumnLayout from "../../Components/Clinic/SingleColumn/SingleColumnLayout.svelte";
    import ClinicHeader from "../../Components/Clinic/Header/ClinicHeader.svelte";
    import PatientColumn from "../../Components/Clinic/SingleColumn/PatientOverview/PatientColumn.svelte";

    function do_things(e){

    }
</script>


<SingleColumnLayout>
    <ClinicHeader/>
    <PatientColumn on:create-appointment={do_things}/>
</SingleColumnLayout>