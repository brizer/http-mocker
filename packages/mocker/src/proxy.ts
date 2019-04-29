import * as httpProxy from 'http-proxy'


export default (req: import("http").IncomingMessage,res: import("http").ServerResponse,options={})=>{
    const proxy = httpProxy.createProxyServer({})

    return proxy.web(req, res, options)
}

