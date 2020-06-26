<script context="module">
    export function buildAttribute(path, label, filterable, sortable, visible, processFunc = (x) => x) {
        return {
            path,
            label,
            filterable,
            sortable,
            visible,
            processFunc
        }
    }
</script>

<script>
    import SortableHeader from "./SortableHeader.svelte";
    import FilterCell from "./FilterCell.svelte";
    import Spinner from "../Spinner/Spinner.svelte";
    import Button from "../Button/Button.svelte";
    import {fade, fly} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import better_flip from '../../helpers/animate/better_flip';
    import Icon from "../Icon/Icon.svelte";
    import {onMount} from "svelte";

    export let attributes = [];
    export let data_promise;
    export let data_attribute;
    export let data_key;
    export let small = true;
    let visibleAttributes = attributes.filter(a => a.visible);
    // Data State
    let result = [];
    let display = [];
    $: display = result;

    // Filter and Sort State
    let filters = {};
    let desc = false;
    let sortedAttribute = "";

    // Pagination
    let pageLimit = 15;
    let page = 0;

    export const shim = (p) => {
        data_promise = p.then(i => {
            result = i.data[data_attribute];
            if (result.length > 0) {
                Object.keys(result[0]).forEach(k => filters[k] = "");
                filters = filters;
            }
            return i;
        });
    };
    const sort = (newAttribute) => {
        if (sortedAttribute === newAttribute) {
            if (desc) {
                desc = false;
                sortedAttribute = "";
                display = result;
                filters = filters;
                return;
            } else {
                desc = !desc;
            }
        } else {
            sortedAttribute = newAttribute;
            desc = false;
        }
        update();
    };
    const update = () => {
        if (display.length > 0 && Object.keys(display[0]).includes(sortedAttribute))
            display = [...display.sort((a, b) =>
                    (a[sortedAttribute].toString().toUpperCase() < b[sortedAttribute].toString().toUpperCase())
                            ? desc ? 1 : -1
                            : (a[sortedAttribute].toString().toUpperCase() > b[sortedAttribute].toString().toUpperCase())
                            ? desc ? -1 : 1
                            : 0)];
    };
    const lookup = (object, path) => {
        let segments = path.split(".");
        let output = "";
        let temp = object;
        for (let s in segments) {
            s = segments[s];
            if (temp.hasOwnProperty(s)) {
                temp = temp[s];
            } else {
                return "";
            }
        }
        return temp || "";
    };

    // Shim to let me mutate query results while still using the await block
    shim(data_promise);

    // Handle Filtering
    $: if (filters) {
        let internal = result;
        for (let path in filters) {
            internal = internal.filter(o => lookup(o, path).toString().toLowerCase().includes(filters[path].toLowerCase()));
        }
        display = internal;
        update();
    }
</script>

<table class="uk-table uk-position-relative uk-table-striped uk-table-middle  uk-table-responsive"
       class:uk-table-small={small}>
    <thead>
    <tr>
        {#each visibleAttributes as attribute}
            {#if attribute.sortable}
                <SortableHeader path={attribute.path} {sort} {sortedAttribute} {desc} label={attribute.label}
                                style={"width:" + 100 / (visibleAttributes.length+1) + "%;"}/>
            {:else}
                <td style={"width:" + 100 / (visibleAttributes.length+1) + "%;"}>{attribute.label}</td>
            {/if}
        {/each}
        <td style={"width:" + 100 / (visibleAttributes.length+1) + "%;"}>
            <div class="uk-flex uk-flex-middle">
                <label style="flex:4">Items per page</label>
                <select class="uk-select uk-flex-1" bind:value={pageLimit}>
                    <option value="5">5</option>
                    <option value="15" selected>15</option>
                    <option value="30">30</option>
                </select>
            </div>
        </td>
    </tr>
    {#if attributes.filter(a=>a.visible && a.filterable).length > 0}
        <tr>
            {#each visibleAttributes as attribute}
                {#if attribute.filterable}
                    <FilterCell bind:value={filters[attribute.path]}/>
                {/if}
            {/each}
            <td>
                {#if display.length > pageLimit}
                    <div class="uk-flex uk-flex-center uk-flex-middle">
                        {#if page > 0}
                            <Icon icon="chevron-left" on:click={()=>page--}/>
                        {:else}<span style="width:1em;"></span>
                        {/if}
                        <span>{page+1}</span>
                        {#if display.length > (page+1) * pageLimit}
                            <Icon icon="chevron-right" on:click={()=>page++}/>
                        {:else}<span style="width:1em;"></span>
                        {/if}
                    </div>
                {/if}
            </td>
        </tr>
    {/if}
    </thead>
    <tbody>
    {#await data_promise}
        <Spinner show={true}/>
        {#each Array(4) as i}
            <tr>
                {#each visibleAttributes as attribute}
                    <td>
                        <div class="placeholder"></div>
                    </td>
                {/each}
                <td class="uk-flex uk-flex-around">
                    <Button>
                        <Icon icon="refresh"/>
                    </Button>
                    <Button>
                        <Icon icon="pencil"/>
                    </Button>
                    <Button>
                        <Icon icon="trash"/>
                    </Button>
                </td>
            </tr>
        {/each}
    {:then r}
        {#each display.slice(page*pageLimit, page*pageLimit + pageLimit) as item, i (item[data_key])}
            <tr out:fly={{duration:500,delay:5 * i, x:50}} in:fly={{delay: 100*i, duration: 500, x:-50}}
                animate:better_flip="{{duration:500}}" class="uk-background-default">
                {#each visibleAttributes as attr}
                    <td>{attr.processFunc(lookup(item, attr.path))}</td>
                {/each}
                <td>
                    <slot name="buttons" id={item[data_key]} object={item}/>
                </td>
            </tr>
        {/each}
    {/await}
    </tbody>
</table>


<style>
    div.placeholder {
        background-color: rgba(0, 0, 0, 0.1);
        height: 2em;
        width: 100%;
    }
</style>