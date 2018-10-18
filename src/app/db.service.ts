import {Injectable} from '@angular/core';
import {$WebSocket, WebSocketSendMode} from '../../node_modules/angular2-websocket/angular2-websocket';
import {Message} from '../Message';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    private route = '/db';
    private open = false;
    private socket: $WebSocket;

    public onMessage = new BehaviorSubject(new Message());

    constructor() {
    }

    /**
     * Connect to Server
     * @param {string} ip
     * @param {string} port
     */
    connect(ip: string, port: number): void {
        this.socket = new $WebSocket('ws://' + environment.host_ip + ':' + environment.host_port + this.route);
        this.socket.setSend4Mode(WebSocketSendMode.Direct);

        this.socket.onOpen(() => {
            this.open = true;
        });

        this.socket.onClose(() => {
            this.open = false;
        });

        this.socket.onMessage(
            (msg: MessageEvent) => {
                console.log('message received', msg.data);
                const message: Message = <Message> JSON.parse(msg.data);
                this.onMessage.next(message);
            },
            {autoApply: false}
        );

        this.socket.onError(
            (error) => {
                console.log('Error:', error);
            }
        );
    }

    /**
     * Check whether the connection is open
     * @return {boolean}
     */
    isOpen(): boolean {
        return this.open;
    }


    /**
     * Send message to server
     * @param request
     */
    send(message: Message): void {
        this.socket.send(message);
    }
}
