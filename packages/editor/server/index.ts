#!/usr/bin/env node
import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import color from 'http-mockjs-util/color'
import * as parseArgs from 'minimist'
import * as portfinder from 'portfinder'
import apiRouter from './routes'
import * as io from 'socket.io'
import { socket } from './socket/connection'
import { Watcher } from './service/watchService';


const args = parseArgs(process.argv)
const defaultPort = args.port || 4000
process.env.DEBUG_LOG = args.debug ? "log": ""

const main = async () => {

    try {
        const port = await portfinder.getPortPromise({
            port: defaultPort
        })
        
        const server  = app.listen(port,()=>{
            console.log(color(`server is launch in port: ${port}`).green)
        })
        socket(io(server))

        
    } catch (error) {
        console.error(error)
    }

}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const staticPath = path.resolve(__dirname,'../ui')
app.use(express.static(staticPath))

app.use('/api',apiRouter)
new Watcher()


main()

