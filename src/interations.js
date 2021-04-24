import arg from 'arg'
import path from 'path'
import inquirer from 'inquirer'

import { CREATE_NEW_CONFIG } from "./globals";
import { getListOfConfigs } from './config';

async function promptOptions(options) {
    
    const { pathFile, pathClone, configName, configs } = options


    const configsNames = (await getListOfConfigs()).map((x, index) => `[CONFIG ${index+1}] ## ${x.name}`);

    if(configs) {
        configsNames.forEach((x, index) => console.log(x));
        process.exit(0)
    }

    const questions = []

    

    let errors = []

    let newConfig = false
    let nameConfig = CREATE_NEW_CONFIG

    if(configName === '' && pathFile == '' && pathClone == '') {
        const { configName: name } = await inquirer.prompt([{
            type: 'list',
            name: "configName",
            message: "Qual configuração você deseja usar?",
            choices: [...configsNames, CREATE_NEW_CONFIG],
            default: CREATE_NEW_CONFIG
        }])

        if(name == CREATE_NEW_CONFIG) {
            newConfig = true;
        } else {
            nameConfig = name;
        }
    }
    

    
    if(pathFile === '' && newConfig) {
        questions.push({
            type: 'input',
            name: 'pathFile',
            message: 'Qual o arquivo que você deseja escutar?',
        })
    }

    if(pathClone === '' && newConfig) {
        questions.push({
            type: 'input',
            name: 'pathClone',
            message: 'Qual o diretório que você deseja salvar a cópia do arquivo?',
        })
    }


    

    const answers = await inquirer.prompt(questions)
    let filePath = path.resolve(options.pathFile || answers.pathFile || '')
    let clonePath = path.resolve(options.pathClone || answers.pathClone || '')

    if(filePath === clonePath && newConfig) {
        errors.push("Você deve informar diferentes nomes para o arquivo escutado e o clonado!")
    }

    return {
        ...options,
        pathFile: filePath,
        pathClone: clonePath,
        configName: (options.configName || nameConfig),
        errors
    }

}

export async function getOptions(rawArgs) {
    const args = arg(
        {
            '--path': String,
            '--clone': String,
            '--config': String,
            '--no-save': Boolean,
            '--configs': Boolean,
            '-p': '--path',
            '-c': '--clone',
        },
        {
            argv: rawArgs.slice(2)
        }
    )

    const options = {
        pathFile: args['--path'] || '',
        pathClone: args['--clone'] || '',
        configName: args['--config'] || '',
        noSave: args['--no-save'] || false,
        configs: args['--configs'] || false
    }

    return await promptOptions(options)
}

