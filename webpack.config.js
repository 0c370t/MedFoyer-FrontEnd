const defaultConfig = require('./conf/default_webpack_config');

let output = [];

if (process.env.DEVMODE) {
    // Local Development
    output.push(defaultConfig("./src/main.js", __dirname + "/public/build"));
} else {
    // Not Local Development
    output.push(defaultConfig("./src/ClinicSite/main.js", __dirname + "/public/_clinic/"));
    output.push(defaultConfig("./src/PatientSite/main.js", __dirname + "/public/_patient/"));
    output.push(defaultConfig("./src/PublicSite/main.js", __dirname + "/public/"))
}

module.exports = output;