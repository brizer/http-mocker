import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import * as jsonfile from 'jsonfile'

import getConfig, { getConfigPath, setConfig } from 'http-mockjs/lib/getConfig'
let configFilePath: string = ''
let configContent: any = {}

const writeFilePromisify = util.promisify(fs.writeFile)

function checkRequiredFiles(files) {
    var currentFilePath;
    try {
        files.forEach(filePath => {
            currentFilePath = filePath;
            fs.accessSync(filePath, (fs as any).F_OK);
        });
        return true;
    } catch (err) {
        return false;
    }
}

function mkdirsSync(dirname) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
} 

const getRoutePath = (lnk:string):string=>{
    let pathL = lnk
    configContent = getConfig(undefined)
    const mockFileName = configContent.mockFileName || 'mocks'
    const pathR = path.resolve(process.cwd(), `./${mockFileName}${pathL}`)
    return pathR
}

export const RouteService = {
    ['getRoute'](req, res, next) {
        const pathR = getRoutePath(req.query.path)
        if (!checkRequiredFiles([pathR])) {
            res.json({
                result: 0,
                message: 'is no path'
            })
        } else {
            jsonfile.readFile(pathR).then(obj => {
                res.json({
                    result: 1,
                    data: obj
                })
            }).catch(err => {
                res.json({
                    result: 0,
                    message: 'some thing is wrong'
                })
            })
        }
    },
    ['setRoute'](req, res, next){
        const pathR = getRoutePath(req.body.route.path)
        const content = req.body.route.content
        if (!checkRequiredFiles([pathR])) {
            const dir = path.dirname(pathR)
            mkdirsSync(dir)
        } 
        jsonfile.writeFile(pathR,content,{spaces:4}).then(() => {
            res.json({
                result: 1
            })
        }).catch(err => {
            res.json({
                result: 0,
                message: 'some thing is wrong'
            })
        })
        
    }
}