import express from 'express'
import version from 'http-mockjs-util/version'
import * as parseArgs from 'minimist'
import * as portfinder from 'portfinder'

const pkg:any = require('../package.json')
const requireVersion:string = pkg.engines.node
//judge environment first
if(!version.isNodeVersionsupport(requireVersion)){
    process.exit(1)
}

const args = parseArgs(process.argv)
const defaultPort = args.port || 4000
process.env.DEBUG_LOG = args.debug ? "log": ""

const main = async () => {
    const app = express()

    try {
        const port = await portfinder.getPortPromise({
            port: defaultPort
        })
            
        app.use(express.static('../ui/dist'))
        
        app.listen(port)
    } catch (error) {
        console.error(error)
    }

}

main()

