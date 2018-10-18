import {Component, OnInit} from '@angular/core';
import {Message} from '../../Message';
import {DbService} from '../db.service';
import {RFReceiver} from '../../Receiver';
import {InteractionService} from '../interaction.service';

@Component({
    selector: 'app-switch-list',
    templateUrl: './switch-list.component.html',
    styleUrls: ['./switch-list.component.scss']
})
export class SwitchListComponent implements OnInit {

    public switch_list: RFReceiver[] = [];

    constructor(private db_service: DbService,
                private interaction_service: InteractionService) {
    }

    ngOnInit() {
        this.initDBSocketConncetion();
        this.initInteractionSocketConnection();
    }

    public getAvailableReceiver(): void {
        const message = new Message();
        message.method = 'get';

        const data = {item: 'receiver'};
        message.data = data;

        this.db_service.send(message);
    }

    /**
     * Change the receivers alias
     * @param id
     * @param alias
     */
    public changeReceiverAlias(id: number, alias: string): void {
        const message = new Message();
        message.method = 'set';

        const data = {receiver: id, field: 'attribute'};
        message.data = data;

        this.db_service.send(message);
    }

    /**
     * Element has changed
     * @param msg
     */
    public elementChange(msg: Message): void {
        this.interaction_service.send(msg);
    }

    private initDBSocketConncetion(): void {

        if (!this.db_service.isOpen()) {
            this.db_service.connect('0.0.0.0', 8888);
        }

        this.getAvailableReceiver();

        this.db_service.onMessage.subscribe((msg: Message) => {
            if (msg.success) {
                this.switch_list = <RFReceiver[]> msg.data;
            }
        });
    }

    private initInteractionSocketConnection(): void {
        if (!this.interaction_service.isOpen()) {
            this.interaction_service.connect('0.0.0.0', 8888);
        }

        this.interaction_service.onMessage.subscribe((msg: Message) => {
            if (msg.success) {
                if (msg.method == 'reload') {
                    this.getAvailableReceiver();
                }
            }
        });
    }


}
