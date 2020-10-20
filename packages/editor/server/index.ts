#!/usr/bin/env node
import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import color from 'http-mockjs-util/color'
import * as portfinder from 'portfinder'
import apiRouter from './routes'
import * as io from 'socket.io'
import { socket } from './socket/connection'
import { Watcher } from './service/watchService';


const defaultPort = 4000
let realPort;
export const main = async () => {

    try {
        realPort = await portfinder.getPortPromise({
            port: defaultPort
        })
        
        const server  = app.listen(realPort,()=>{
            console.log(color(`server is launch in url: http://localhost:${realPort}`).green)
        })
        socket(io(server))

        
    } catch (error) {
        console.error(error)
    }

}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
const staticPath = path.resolve(__dirname,'../ui')
app.use(express.static(staticPath))

main()

app.get('/', function(req, res){
    res.render('users', {
      title: "Http-mockjs",
      realPort
    });
  });

app.use('/api',apiRouter)
new Watcher()



