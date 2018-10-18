import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../Message';
import {DbService} from '../db.service';
import {RFReceiver} from '../../Receiver';
import {InteractionService} from '../interaction.service';
import {MatBottomSheet, MatDialog} from '@angular/material';
import {ModularDialogComponent} from '../modular-dialog/modular-dialog.component';
import {DialogDataField, ModularDialogData} from '../ModularDialogData';

@Component({
    selector: 'app-switch-list',
    templateUrl: './switch-list.component.html',
    styleUrls: ['./switch-list.component.scss']
})
export class SwitchListComponent implements OnInit, OnDestroy {

    public receiver_list: RFReceiver[] = [];
    private subscriptions = [];

    constructor(private db_service: DbService,
                private interaction_service: InteractionService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAvailableReceiver();
        this.initInteractionSocketConnection();
    }

    ngOnDestroy() {
        for (const element in this.subscriptions) {
            console.log(element);
        }

    }

    public getAvailableReceiver(): void {
        const sub = this.db_service.getAvailableReceivers()
            .subscribe(
                (msg: Message) => {
                    if (msg.success) {
                        this.receiver_list = <RFReceiver[]> msg.data;
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        this.subscriptions.push(sub);
    }

    /**
     * Change the receivers alias
     * @param id
     * @param alias
     */
    public changeReceiverAlias(id: number, alias: string): void {
        const sub = this.db_service.setReceiverAlias(id, alias)
            .subscribe(
                (msg: Message) => {
                    if (msg.success) {
                        console.log('changed alias');
                    } else {
                        console.log('error changing alias');
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        this.subscriptions.push(sub);
    }

    /**
     * Element has changed
     * @param msg
     */
    public elementChange(msg: Message): void {
        this.interaction_service.send(msg);
    }


    private initInteractionSocketConnection(): void {
        if (!this.interaction_service.isOpen()) {
            this.interaction_service.connect('0.0.0.0', 8888);
        }

        this.interaction_service.onMessage.subscribe(
            (msg: Message) => {
                if (msg.success) {
                    if (msg.method === 'feedback') {
                        const receiver = <RFReceiver> msg.data;

                        // find receiver
                        for (let item of this.receiver_list) {
                            if (item.id === receiver.id) {
                                if (item.state !== receiver.state) {
                                    item.state = receiver.state;
                                }
                            }
                        }

                    }
                }
            },
            (error) => {
                console.log(error);
            });
    }

    private openDialog(receiver_id: number): void {

        let alias_field: DialogDataField = {
            title: 'Alias',
            placeholder: 'Alias',
            value: null
        };

        let data: ModularDialogData = {
            title: 'Change Alias',
            subtitle: null,
            fields: [alias_field]
        };

        const dialog_ref = this.dialog.open(ModularDialogComponent,
            {
                width: '90%',
                data: data
            }
        );

        dialog_ref.afterClosed().subscribe(
            (data: ModularDialogData) => {
                // Todo Make this elegant
                this.changeReceiverAlias(receiver_id, data.fields[0].value);
                for (const item of this.receiver_list) {
                    if (item.id == receiver_id) {
                        item.alias = data.fields[0].value;
                    }
                }

            },
            (error) => {
                console.log(error);
            }
        );
    }

}
