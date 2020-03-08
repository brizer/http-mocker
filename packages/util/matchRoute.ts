import { Routes } from "./declations";
import pathToRegexp from 'path-to-regexp';

export function getMatechedRoute(proxyLists:Routes|{},proxyURL:string):Routes {
    let proxyMatch:Routes = proxyLists[proxyURL];
        //to adapte express router url style such as user/:id and so on:
        Object.keys(proxyLists).forEach((key)=>{
            const re = pathToRegexp(key)
            if(re.exec(proxyURL)){
                proxyMatch = proxyLists[key]
            } else if(proxyURL.includes('?')) {
                // if some url with params have not be defined in routers
                // handle /api/user?otherParam=true to /api/user.
                const key = proxyURL.substr(0,proxyURL.indexOf('?'));
                if(key in proxyLists){
                    proxyMatch = proxyLists[key];
                }
            }
        });
    return proxyMatch;     
}