import { Server } from "socket.io";


export enum SOCKET_EVENTS {
    CONNECTION = 'connection',
    DIS_CONNECTION = 'disconnect',
    CHANGE_CONFIG = 'CHANGE_CONFIG'
}


let socketer:Socket;
class Socket {
    private io: Server;
    constructor(io: Server) {

        this.io = io;
        this.init()
    }

    public emit(eventName:SOCKET_EVENTS,data?:any){
        this.io.sockets.emit(SOCKET_EVENTS[eventName],data)
    }

    private init(): void {
        //connect
        this.io.on(SOCKET_EVENTS.CONNECTION, socket => {
            //disconnection
            socket.on(SOCKET_EVENTS.DIS_CONNECTION, () => {

            })
        })
    }
}

export const socket = (io?:Server)=>{
    socketer = socketer || new Socket(io)
    return socketer
}
