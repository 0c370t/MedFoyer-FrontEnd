import {sineInOut} from "svelte/easing";

export default function (node, {from, to}, params){
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const d = Math.sqrt(dx * dx + dy * dy);
    return Object.assign({}, {
        delay: 0,
        duration: Math.sqrt(d) * 120,
        easing: sineInOut,
        css: (t, u) => {
            let s = t > u ? u : t;
            return `transform: translate(${u * dx}px, ${u * dy}px);box-shadow: 0 0 ${s * (d/100)}px ${s * (d / 75)}px rgba(0,0,0,0.5);z-index:${Math.abs(d)}`
        }
    }, params);

}