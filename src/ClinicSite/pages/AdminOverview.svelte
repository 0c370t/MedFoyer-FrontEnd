<script>
    import SingleColumnLayout from "../../Components/Clinic/SingleColumn/SingleColumnLayout.svelte";
    import ClinicHeader from "../../Components/Clinic/Header/ClinicHeader.svelte";
    import ClinicColumn from "../../Components/Clinic/SingleColumn/ClinicOverview/ClinicColumn.svelte";
</script>

<SingleColumnLayout>
    <ClinicHeader on:create-appointment on:create-patient/>
    <ClinicColumn/>
</SingleColumnLayout>