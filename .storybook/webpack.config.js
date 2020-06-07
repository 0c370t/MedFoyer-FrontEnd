let preprocess = require('svelte-preprocess');

module.exports = async ({config, mode}) => {
    let j;
    // Find svelteloader from the webpack config
    const svelteloader = config.module.rules.find((r, i) => {
        if (r.loader && r.loader.includes('svelte-loader')) {
            j = i;
            return true;
        }
    });


    // safely inject preprocess into the config

    config.module.rules[j] = {
        ...svelteloader,
        options: {
            ...svelteloader.options,
            hydratable: true,
            emitCss: !config.dev,
            preprocess: preprocess(),
            style: preprocess()
        }
    };

    // return the overridden config
    return config;
};