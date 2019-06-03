import * as fs from 'fs'
import * as util from 'util'
import getConfig ,{ getConfigPath } from 'http-mockjs/lib/getConfig'
let configFilePath:string = ''
let configContent = {}

const writeFilePromisify = util.promisify(fs.writeFile)

export const ConfigService = {
    ['getConfig'](req,res,next){
        configContent = getConfig()
        configFilePath = getConfigPath()
        if(!configFilePath){
            console.log('there is no config file found ')
            return
        }
        res.json({
            result:1,
            data:configContent
        })
    },
    ['setConfig'](req,res,next){
        const configInfo = req.configInfo;
        if(configFilePath && configInfo){
            writeFilePromisify(configFilePath,configInfo,'utf8').then(data=>{
                console.log(data)
                res.json({
                    result:1
                })
            })
        }

    }
}