import * as path from 'path'
import * as fs from 'fs'
import * as pathToRegexp from 'path-to-regexp'
import * as mock from 'mockjs'
import color from 'http-mockjs-util/color'
import { getMatechedRoute } from 'http-mockjs-util/matchRoute';
import { watch } from 'chokidar'
import { getConfigPath, default as getConfig } from './getConfig'
import { Config, Routes } from 'http-mockjs-util/declations'
/**
 * Print proxy init info
 * @param {object} config - config info
 */
const printProxyInfo = (config:Config) =>{
    const proxyLists = config.routes;
    //init proxy output:
    if(!proxyLists){
        console.log(color(`Please set some matching rules to routes`).red)
    }
    Object.keys(proxyLists).forEach(key=>{
        const proxyMatch = proxyLists[key]
        const mapLocalPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
        console.log(`${color(key).green} ${color('has been map local to').black} ${color(mapLocalPath).yellow}`)
    })
}
/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = async (app, config: Config) => {
    let proxyLists = config.routes;

    //print info
    printProxyInfo(config)

    //watch config file changes
    const configPath:string = getConfigPath()
    const watcher = watch(configPath)
    watcher.on('all',path=>{
        const config = getConfig(process.cwd())
        proxyLists = config.routes
        console.log(color('config file content has changed').green)
    })
    // app.use(function (req, res, next) {
    //     res.set('Content-type','application/json');
    //     next();
    //   });
    //filter configed api and map local
    app.all('/*', (req, res, next) => {
        const proxyURL:string = `${req.method} ${req.originalUrl}`;
        const proxyMatch = getMatechedRoute(proxyLists,proxyURL);
        // let proxyMatch:Routes = proxyLists[proxyURL];
        // //to adapte express router url style such as user/:id and so on:
        // Object.keys(proxyLists).forEach((key)=>{
        //     const re = pathToRegexp(key)
        //     if(re.exec(proxyURL)){
        //         proxyMatch = proxyLists[key]
        //     } else if(proxyURL.includes('?')) {
        //         // if some url with params have not be defined in routers
        //         // handle /api/user?otherParam=true to /api/user.
        //         const key = proxyURL.substr(0,proxyURL.indexOf('?'));
        //         if(key in proxyLists){
        //             proxyMatch = proxyLists[key];
        //         }
        //     }
            
        // })

        //if there is a request config in the config file
        if (proxyMatch && proxyMatch.ignore!== true) {
            const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
            const responseBody = fs.readFileSync(curPath, 'utf-8');
            const result = mock.mock(responseBody)
            res.set(config.responseHeaders);
            res.send(result);
            res.end();
        }
        else {
            next();
        }
    })
}



export default proxy