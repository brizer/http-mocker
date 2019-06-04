import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import * as jsonfile from 'jsonfile'

import getConfig ,{ getConfigPath, setConfig } from 'http-mockjs/lib/getConfig'
let configFilePath:string = ''
let configContent:any = {}

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



export const RouteService = {
    ['getRoute'](req,res,next){
        let pathL = req.query.path
        configContent = getConfig(undefined)
        const mockFileName = configContent.mockFileName||'mocks'
        console.log(process.cwd())
        const pathR = path.resolve(process.cwd(),`./${mockFileName}${pathL}`)
        
        if(!checkRequiredFiles([pathR])){
            res.json({
                result:0,
                message:'is no path'
            })
        }else{
            jsonfile.readFile(pathR).then(obj=>{
                res.json({
                    result:1,
                    data:obj
                })
            }).catch(err=>{
                res.json({
                    result:0,
                    message:'some thing is wrong'
                })
            })
        }
    }
}