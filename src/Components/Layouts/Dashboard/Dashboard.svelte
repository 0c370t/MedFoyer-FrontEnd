<script>
    import Logo from "../../../svg/Logo.svelte";
    import DashboardItem from "./DashboardItem.svelte";
    import Icon from "../../Icon/Icon.svelte";

    export let title = "Untitled dashboard";
</script>
<div uk-height-viewport class="container">
    <div class="logo uk-light uk-background-primary">
        <Logo/>
        <h1 class="uk-margin-remove uk-display-inline-block">MedFoyer</h1>
    </div>

    <header class="uk-background-secondary uk-light uk-flex uk-flex-between uk-padding-small">
        <div class="">
            <slot name="header-left"/>
        </div>
        <div class="">
            <slot name="header-center"/>
        </div>
        <div class="">
            <slot name="header-right"/>
        </div>
    </header>

    <aside class="uk-background-primary uk-flex uk-flex-column uk-light">
        <div class="uk-text-center">
            <h2 class="uk-margin-remove">{title}</h2>
        </div>
        <hr/>
        <slot name="items">
            <DashboardItem title="Bob Smith" active={true}>
                <div class="uk-flex uk-child-width-1-2">
                    <span>
                        <Icon options="{{icon: 'clock'}}"/>
                        4:00pm
                    </span>
                    <span>
                        <Icon options="{{icon: 'user'}}"/>
                        Dr. Sethi
                    </span>
                </div>
            </DashboardItem>
            <DashboardItem title="Bob Smith">
                <div class="uk-flex uk-child-width-1-2">
                    <span>
                        <Icon options="{{icon: 'clock'}}"/>
                        4:00pm
                    </span>
                    <span>
                        <Icon options="{{icon: 'user'}}"/>
                        Dr. Sethi
                    </span>
                </div>
            </DashboardItem>
            <DashboardItem title="Bob Smith">
                <div class="uk-flex uk-child-width-1-2">
                    <span>
                        <Icon options="{{icon: 'clock'}}"/>
                        4:00pm
                    </span>
                    <span>
                        <Icon options="{{icon: 'user'}}"/>
                        Dr. Sethi
                    </span>
                </div>
            </DashboardItem>
            <DashboardItem title="Bob Smith">
                <div class="uk-flex uk-child-width-1-2">
                    <span>
                        <Icon options="{{icon: 'clock'}}"/>
                        4:00pm
                    </span>
                    <span>
                        <Icon options="{{icon: 'user'}}"/>
                        Dr. Sethi
                    </span>
                </div>
            </DashboardItem>
        </slot>
    </aside>

    <main>

    </main>
</div>


<style lang="scss">
    div.container {
        display: grid;
        grid-template-areas: "logo header" "aside main";
        grid-template-rows: 10vh 1fr;
        grid-template-columns: 20% 1fr;

        div.logo {
            grid-area: logo;
            display: flex;
            align-items: center;
            padding: 1em;
            justify-content: center;
        }

        header {
            grid-area: header;
        }

        aside {
            grid-area: aside;
        }

        main {
            grid-area: main;
        }
    }
</style>