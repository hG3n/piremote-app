import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RFReceiver} from '../../Receiver';
import {MatSlideToggleChange} from '@angular/material';
import {Message} from '../../Message';

@Component({
    selector: 'app-switch-list-tile',
    templateUrl: './switch-list-tile.component.html',
    styleUrls: ['./switch-list-tile.component.scss']
})
export class SwitchListTileComponent implements OnInit {

    @Input('receiver') receiver: RFReceiver;
    @Output('change') change = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onChange(event: MatSlideToggleChange) {
        const message = new Message();
        message.method = 'toggle';

        if (event.checked) {
            message.data = {
                receiver: this.receiver.id,
                signal: this.receiver.on_signal_id,
                state: event.checked
            };
        } else {
            message.data = {
                receiver: this.receiver.id,
                signal: this.receiver.off_signal_id,
                state: event.checked
            };
        }

        this.change.emit(message);
    }
}
