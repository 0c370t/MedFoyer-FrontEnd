<script>
    import Logo from "../../svg/Logo.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";

    const currentYear = new Date().getFullYear();
</script>

<!-- TOP -->
<div class="top-wrap uk-position-relative uk-light uk-background-secondary">

    <!-- NAV -->
    <div class="nav"
         data-uk-sticky="cls-active: uk-background-primary uk-box-shadow-medium; top: 100vh; animation: uk-animation-slide-top">
        <div class="uk-container">
            <nav class="uk-navbar uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div class="uk-navbar-left">
                    <div class="uk-navbar-item uk-padding-remove-horizontal">
                        <h2 class="uk-margin-remove" style="height:2em"><a class="uk-logo" title="Logo" href="#"
                                                                           data-uk-scroll="duration:500">
                            <Logo/>
                            MedFoyer</a></h2>
                    </div>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav uk-visible@s">
                        <li><a data-uk-scroll="duration:500" href="#content">Features</a></li>
                        <li><a data-uk-scroll="duration:500" href="#surveys">Surveys</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <!-- /NAV -->

    <div class="uk-cover-container uk-light uk-flex uk-flex-middle top-wrap-height">

        <!-- TOP CONTAINER -->
        <div class="uk-container uk-flex-auto top-container uk-position-relative uk-margin-medium-top"
             data-uk-parallax="y: 0,50; easing:0; opacity:0.2">
            <div class="uk-width-1-2@s"
                 data-uk-scrollspy="cls: uk-animation-slide-right-medium; target: > *; delay: 150">
                <h1 class="uk-margin-remove-top">The waiting room of the future.</h1>
                <p class="subtitle-text">MedFoyer uses your patients' cell phones to enable them to check
                                         in from their vehicles, minimizing unnecessary contact with your
                                         staff.</p>
                <a href="#content" data-uk-scroll="duration:500" title="Learn More"
                   class="uk-button uk-button-primary uk-border-pill" data-uk-scrollspy-class="uk-animation-fade">LEARN
                                                                                                                  MORE </a>
            </div>
        </div>
        <!-- /TOP CONTAINER -->
        <!-- TOP IMAGE -->
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
             data-src="/assets/img/woman-in-blue-shirt-wearing-face-mask.jpg" alt="" data-uk-cover data-uk-img
             data-uk-parallax="opacity: 1,0.1; easing:0">
        <!-- /TOP IMAGE -->
    </div>
</div><!-- /TOP -->
<section id="content" class="uk-section uk-section-default">
    <div class="uk-container">
        <div class="uk-section uk-section-small uk-padding-remove-top">
            <ul class="uk-subnav uk-subnav-pill uk-flex uk-flex-center"
                data-uk-switcher="connect: .uk-switcher; animation: uk-animation-fade">
                <li><a class="uk-border-pill" href="#">Discover</a></li>
                <li><a class="uk-border-pill" href="#">Benefits</a></li>
                <li><a class="uk-border-pill" href="#">Features</a></li>
            </ul>
        </div>

        <ul class="uk-switcher uk-margin">
            <li>
                <div class="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid
                     data-uk-scrollspy="target: > div; cls: uk-animation-slide-left-medium">
                    <div>
                        <img data-src="/assets/img/undraw_medical_care_movn.svg" alt="" data-uk-img>
                    </div>
                    <div data-uk-scrollspy-class="uk-animation-slide-right-medium">
                        <h6 class="uk-text-primary">BY HEALTH CARE PROVIDERS</h6>
                        <h2 class="uk-margin-small-top">For health care providers.</h2>
                        <p class="subtitle-text">
                            The unexpected outbreak of the COVID-19 pandemic has taken the world by surprise and left
                            businesses including healthcare clinics and surgery centers scrambling to find new solutions
                            in light of the crisis. </p>
                        <div class="uk-grid uk-child-width-1-2@s" data-uk-grid>
                            <div>
                                <h4>HIPAA Compliant Platform</h4>
                                <p>MedFoyer is fully HIPAA Compliant, and data security is our top priority.</p>
                            </div>
                            <div>
                                <h4>Facilitate Social Distancing</h4>
                                <p>MedFoyer uses a patient's smartphone to let them check in from their vehicle.</p>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-around uk-margin-medium-top">
                            <a href="mailto:sales@medfoyer.com" class="uk-button uk-button-primary uk-flex uk-flex-middle uk-box-shadow-hover-medium"><span class="uk-margin-small-right">Request More Information</span><Icon options={{icon: "mail"}}/></a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid
                     data-uk-scrollspy="target: > div; cls: uk-animation-slide-left-medium">
                    <div data-uk-scrollspy-class="uk-animation-slide-right-medium">
                        <h6 class="uk-text-primary">SIMPLICITY AND EFFICIENCY</h6>
                        <h2 class="uk-margin-small-top">Create ease of mind for your patients.</h2>
                        <p class="subtitle-text">
                            With the waiting room of the future, you can enable a smooth, safe, and cost-effective
                            check-in process for patients.
                            Our research indicates that patients overwhelmingly would prefer to wait in their vehicle,
                            rather than a crowded waiting room.
                        </p>
                        <div class="uk-grid uk-child-width-1-2@s" data-uk-grid>
                            <div>
                                <h4>Reduce front desk churn</h4>
                                <p>
                                    MedFoyer packages tailor-made features to help your front desk staff focus where it
                                    matters most. </p>
                            </div>
                            <div>
                                <h4>Increase patient safety</h4>
                                <p>
                                    By automating COVID-19 pre-screenings, MedFoyer helps keep at-risk patients socially distanced.
                                </p>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-around uk-margin-medium-top">
                            <a href="mailto:sales@medfoyer.com" class="uk-button uk-button-primary uk-flex uk-flex-middle uk-box-shadow-hover-medium"><span class="uk-margin-small-right">Request More Information</span><Icon options={{icon: "mail"}}/></a>
                        </div>
                    </div>
                    <div>
                        <img data-src="/assets/img/undraw_order_a_car_3tww.svg" alt="" data-uk-img>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid
                     data-uk-scrollspy="target: > div; cls: uk-animation-slide-right-medium">
                    <div>
                        <img data-src="/assets/img/undraw_social_distancing_2g0u.svg" alt="" data-uk-img>
                    </div>
                    <div data-uk-scrollspy-class="uk-animation-slide-left-medium">
                        <h6 class="uk-text-primary">EXCEED COMMUNICATION EXPECTATIONS</h6>
                        <h2 class="uk-margin-small-top">Utilize a rich feature set.</h2>
                        <p class="subtitle-text">
                            MedFoyer handles appointment reminders, COVID-19 screenings, to facilitate safe check-ins for your patients.
                            An easy-to-use, to the point interface for clinic staff let MedFoyer fit into your workflow, rather than obstructing it.
                        </p>
                        <div class="uk-grid uk-child-width-1-2@s" data-uk-grid>
                            <div>
                                <h4>Great stuff</h4>
                                <p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="">Learn
                                                                                                               more.</a>
                                </p>
                            </div>
                            <div>
                                <h4>Data analysis</h4>
                                <p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="">Learn
                                                                                                               more.</a>
                                </p>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-around uk-margin-medium-top">
                            <a href="mailto:sales@medfoyer.com" class="uk-button uk-button-primary uk-flex uk-flex-middle uk-box-shadow-hover-medium"><span class="uk-margin-small-right">Request More Information</span><Icon options={{icon: "mail"}}/></a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>


    </div>
</section>
<section id="surveys" class="uk-section uk-section-secondary uk-section-large">
    <div class="uk-container">
        <div class="uk-grid uk-child-width-1-2@l uk-flex-middle">
            <div>
                <h2 class="uk-margin-small-top uk-h1">Help us build something incredible.</h2>
                <p class="subtitle-text">
                    We are currently conducting surveys to make sure we can provide the most help during the COVID-19
                    Pandemic. Please consider taking 2 minutes to fill one out: </p>
                <div class="">
                    <a href="https://forms.gle/iBwTMaRtYneYNFz59" target="_blank"
                       class="uk-button uk-button-primary uk-border-pill uk-margin-medium-right"
                       data-uk-icon="arrow-right">I am a patient</a>
                    <a href="https://forms.gle/tuiqkX75ykiT3rXj7" target="_blank"
                       class="uk-button uk-button-primary uk-border-pill" data-uk-icon="arrow-right">I am a
                                                                                                     practictioner</a>
                </div>
            </div>
            <div data-uk-scrollspy="cls: uk-animation-fade">
                <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                     data-src="/assets/img/undraw_my_app_grf2.svg" data-uk-img alt="Image">
            </div>
        </div>
    </div>
</section><!-- FOOTER -->
<footer class="uk-section uk-section-default uk-padding-remove-bottom">
    <div class="uk-container">
        <div class="uk-grid uk-grid-large" data-uk-grid>
            <div class="uk-width-1-2@m">
                <h5>MedFoyer</h5>
                <p>
                    For questions, comments, or inquiries regarding the waiting room of the future, please reach out to us at <a href="mailto:sales@medfoyer.com" title="">sales@medfoyer.com</a>.
                </p>
            </div>
            <!--
            <div class="uk-width-1-6@m">
                <h5>OUR COMPANY</h5>
                <ul class="uk-list">
                    <li>Team</li>
                    <li>Work</li>
                    <li>Culture</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            -->
        </div>
    </div>

    <div class="uk-text-center uk-padding uk-padding-remove-horizontal">
        <span class="uk-text-small uk-text-muted">©{currentYear} MedFoyer Corporation</span>
    </div>
</footer><!-- /FOOTER -->

<style>
    .nav {
        position: absolute;
        top: 15px;
        z-index: 99;
        left: 0;
        right: 0;
    }

    .uk-sticky-placeholder {
        height: 0 !important;
    }

    .top-wrap::before, .overlay-wrap::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: '';
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .top-wrap-height {
        height: 80vh;
        min-height: 460px;
        transition: height 0.25s;
    }

    .uk-subnav-pill > * > :first-child {
        padding: 0.5rem 1rem;
    }

    .uk-subnav-pill > *:not(.uk-active) > :first-child {
        background-color: rgba(0, 0, 0, 0.04);
    }

    .top-container {
        z-index: 2;
    }

    .uk-logo img {
        height: 38px;
    }

    .subtitle-text {
        font-size: 1.2em;
        opacity: 0.7;
        font-weight: 300;
    }

    .logos-grid img {
        display: block;
        width: 60px;
        margin: 0 auto;
        filter: grayscale(100%);
        transition: filter 0.25s;
    }

    .logos-grid img:hover {
        display: block;
        width: 60px;
        margin: 0 auto;
        filter: grayscale(0);
    }
</style>