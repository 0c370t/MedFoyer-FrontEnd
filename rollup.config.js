import defaultConfig from './conf/default_rollup_config';

const production = !process.env.ROLLUP_WATCH;
let output = [];
if (production){
    let publicApp = Object.assign({}, {
            input: 'src/PublicSite/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name:"publicApplication",
                file: 'public/build/bundle.js'
            }
        }, defaultConfig(true,'public/build', true)
    );

    let patientApp = Object.assign({}, {
            input: 'src/PatientSite/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name:"patientApplication",
                file: 'public/patient/build/bundle.js'
            }
        }, defaultConfig(false, 'public/patient/build')
    );

    let clinicApp = Object.assign({}, {
            input: 'src/ClinicSite/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name:"clinicApplication",
                file: 'public/clinic/build/bundle.js'
            }
        }, defaultConfig(false, 'public/clinic/build')
    );
    output = [publicApp, patientApp, clinicApp];
}
else {
    output = Object.assign({}, {
            input: 'src/local.main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name:"localApplication",
                file: 'public/build/bundle.js'
            }
        }, defaultConfig(true, 'public/build', false)
    );
}

export default output;