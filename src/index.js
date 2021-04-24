import { getOptions } from './interations'
import { addConfig, createObjectConfig, getConfig } from './config';
import { CREATE_NEW_CONFIG } from './globals';
import { watchingFile } from './watching';

export async function cli(args) {

    
    const { pathFile: file, pathClone: clone, configName: nameConfig, noSave, errors } = await getOptions(args);

    let pathFile = file;
    let pathClone = clone;
    let configName = nameConfig;

    try {
        if(errors.length > 0) {
            throw new Error(errors)
        }

        if(configName === CREATE_NEW_CONFIG && !noSave) {
            await addConfig(createObjectConfig({ pathFile, pathClone }))
        } else if(!noSave) {
            const name = nameConfig.split('##')[1].trim()
            const config = await getConfig({ name });
            pathFile = config.pathFile;
            pathClone = config.pathClone;
        }

        

        console.log("\nEscutando:", pathFile)
        console.log("\nCopiando para:", pathClone)

        console.log('\n\n');

        watchingFile({ pathFile, pathClone })



    } catch (error) {
        console.log(error)
    }
    
}

