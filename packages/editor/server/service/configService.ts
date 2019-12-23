import * as fs from 'fs'
import * as util from 'util'
import getConfig, { getConfigPath, setConfig } from 'http-mockjs-util/getConfig'
import { Config } from 'http-mockjs-util/declations'
let configFilePath:string = ''
let configContent: Config = {}

const writeFilePromisify = util.promisify(fs.writeFile)

export const ConfigService = {
    ['getConfig'](req,res,next){
        configContent = getConfig(undefined)
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
        const configInfo = req.body.config;
        if(configFilePath && configInfo){
            // only set routes filed in GUI
            configContent = getConfig(undefined);
            configContent.routes = configInfo.routes;
            setConfig(configContent).then(data=>{
                res.json({
                    result:1
                })
            })
            .catch(err=>{
                res.json({
                    result:0
                })
            })
        }

    }
}