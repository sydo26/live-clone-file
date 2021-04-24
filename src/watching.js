import path from 'path'
import { existsSync } from 'fs'

import { readFile, copyFile, unlink, mkdir } from 'fs/promises'

import workerFarm from 'worker-farm'

const workers = workerFarm(require.resolve('./child'))

let ok = true
let globalData = null;


const getDataFile = async (pathFile) => {
    return await readFile(pathFile, { encoding: 'binary' })
}

const wasAltered = (data) => {
    if(globalData !== data) {
        return true;
    } 

    return false;
}

const saveClone = async ({ pathFile, pathClone }) => {

    if(!existsSync(pathClone)) {
        await mkdir(path.dirname(pathClone), {recursive: true})
    }

    try {
        await unlink(pathClone)
    } catch (error) {
        //---
    }
    await copyFile(pathFile, pathClone)
}


export const watchingFile = async ({ pathFile, pathClone }) => {
    workers(`Escutando o arquivo ${pathFile}`, async function (err, outp) {
        console.log(outp)
        globalData = await getDataFile(pathFile)
        await saveClone({pathFile, pathClone})

        while(ok) {
            try {
                await new Promise((resolve) => setTimeout(resolve, 100))
                
                const data = await getDataFile(pathFile)

                if(wasAltered(data)) {
                    console.log("salvo com sucesso!")
                    await saveClone({pathFile, pathClone})
                    globalData = data
                }

            } catch (error) {
                ok = false;
            }
        }
    })
}