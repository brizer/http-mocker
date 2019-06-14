import * as io from 'socket.io-client'


export enum SOCKET_EVENTS {
    CONNECTION = 'connection',
    DIS_CONNECTION = 'disconnect',
    CHANGE_CONFIG = 'CHANGE_CONFIG'
}

let client;

class SocketClient {
    private io :any
    private connected:boolean
    constructor(){
        this.io = io.connect('http://localhost:4000')
        this.init()
    }
    private init(){
        this.io.on('connection',()=>{
            console.log('client socket success')
        })
    }
    public on(eventName:SOCKET_EVENTS,handle?:Function){
        this.io.on(SOCKET_EVENTS[eventName],handle)
    }
}

export const socketClient = ()=>{
    client = client || new SocketClient()
    return client
}
