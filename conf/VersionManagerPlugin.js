const fs = require('fs');
const path = require('path');
module.exports = class VersionManagerPlugin{
    constructor(_options = {}){
        this.options = {};
        if(_options.hasOwnProperty("paths")){
            this.paths = _options.paths;
        } else {
            this.paths = ["../public/index.html"];
        }
        if(_options.hasOwnProperty("files")){
            this.files = _options.files;
        } else {
            this.files = ["bundle.js"];
        }
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'VersionManagerPlugin',
            (compilation, callback) => {
                console.log("\x1b[34m | Version Manager Plugin Initializing... \x1b[0m");
                const v = Math.floor(Math.random() * 1000000);
                console.log("\x1b[34m | - Current Build Version \x1b[30m" + v + "\x1b[0m");
                this.paths.forEach(p => {
                    try{
                        let data = fs.readFileSync(path.resolve(__dirname, p));
                        console.log("\x1b[34m | - Updating File: " + p + "\x1b[0m");
                        let output = data.toString();
                        this.files.forEach(f => {
                            console.log("\x1b[34m | - - Updating all instances of " + f + "\x1b[0m");
                            output = output.split(/\?v=[\d]+/g).join("");
                            output = output.split(f).join(f+"?v=" + v)
                        });
                        fs.writeFileSync(path.resolve(__dirname, p), output, (err)=>{if(err)throw err})
                        console.log("\x1b[34m | - Done.\x1b[0m");
                        console.log("\x1b[34m | - - - - - |\x1b[0m");
                    } catch (e) {
                        console.log("\x1b[31m\x1b[1m | = Error Encountered! \x1b[0m");
                        console.log("\x1b[31m\x1b[1m | = = " + e + "\x1b[0m");
                    }
                });
                console.log("\x1b[34m | All Done!\x1b[0m");
                console.log("\x1b[34m | - - - - - |\x1b[0m");
                // Manipulate the build using the plugin API provided by webpack
                callback();
            }
        );
    }
};