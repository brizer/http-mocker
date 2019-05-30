import * as express from 'express'
import version from 'http-mockjs-util/version'
import color from 'http-mockjs-util/color'
import * as parseArgs from 'minimist'
import * as portfinder from 'portfinder'
import * as readPkg from 'read-pkg'

const checkVersion = async () => {
    const pkg = await readPkg()
    const requireVersion:string = pkg.engines.node
    //judge environment first
    if(!version.isNodeVersionsupport(requireVersion)){
        process.exit(1)
    }
}


const args = parseArgs(process.argv)
const defaultPort = args.port || 4000
process.env.DEBUG_LOG = args.debug ? "log": ""

const main = async () => {

    try {
        const port = await portfinder.getPortPromise({
            port: defaultPort
        })
        
        app.listen(port,()=>{
            console.log(color(`server is launch in port: ${port}`).green)
        })
    } catch (error) {
        console.error(error)
    }

}

const app = express()
app.use(express.static('dist/ui'))


checkVersion()
main()
