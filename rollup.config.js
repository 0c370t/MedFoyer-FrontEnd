import defaultConfig from './conf/default_rollup_config';

let output = [];

if(process.env.DEVMODE){
    let localApp = Object.assign({}, {
        input: 'src/main.js',
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'medfoyer',
            file: 'public/build/bundle.js'
        }
    }, defaultConfig({
        verbose: true,
        contentBase: 'public',
        historyApiFallback: true,
        port: 5000,
        host: '0.0.0.0'
    }));
    output = [localApp];
} else {
    let publicApp = Object.assign({}, {
            input: 'src/PublicPages/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name: 'medfoyer_landing_application',
                file: 'public/build/bundle.js'
            }
        }, defaultConfig(false,true
        )
    );

    let patientApp = Object.assign({}, {
            input: 'src/PatientSite/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name: 'medfoyer_patient_application',
                file: 'public/patient/build/bundle.js'
            }
        }, defaultConfig(false)
    );

    let clinicApp = Object.assign({}, {
            input: 'src/ClinicSite/main.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name: 'medfoyer_clinic_application',
                file: 'public/clinic/build/bundle.js'
            }
        }, defaultConfig(false)
    );
    output = [publicApp, patientApp, clinicApp];
}

export default output;