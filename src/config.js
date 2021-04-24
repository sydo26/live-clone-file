import path from 'path'

import { writeFile, readFile } from 'fs/promises'

const configFile = path.resolve(__dirname, 'configs')

export const addConfig = async (objectConfig) => {
    const size = Buffer.byteLength(JSON.stringify(objectConfig))
    const data = Buffer.alloc(size, JSON.stringify(objectConfig)).toString('base64')
    const currentData = await readFile(configFile, { encoding: 'utf-8' })
    await writeFile(configFile, `${currentData}${data}\r\n`, {encoding: 'utf-8'})
}


export const getListOfConfigs = async () => {
    const data = await readFile(configFile, { encoding: 'utf-8'})
    const dataArr = data.split(/\r?\n/)

    const objects = []

    for(let i = 0; i < dataArr.length - 1; i++) {
        const raw = dataArr[i]
        const buffer = Buffer.from(raw, 'base64').toString('utf-8')
        objects.push(JSON.parse(buffer))

    }

    return objects
}

export const getConfig = async ({ name }) => {
    
    const objects = await getListOfConfigs()

    for(let i = 0; i < objects.length; i++) {
        if(objects[i].name === name) {
            return objects[i]
        }
    }

    return undefined
    
}

export const createObjectConfig = ({ pathFile, pathClone }) => ({
    pathFile,
    pathClone,
    name: `${pathFile} -> ${pathClone} (${new Date().toISOString()})`
})