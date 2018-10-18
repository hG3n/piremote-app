import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ModularDialogData} from '../ModularDialogData';

@Component({
    selector: 'app-modular-dialog',
    templateUrl: './modular-dialog.component.html',
    styleUrls: ['./modular-dialog.component.scss']
})
export class ModularDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ModularDialogData) {
    }

    ngOnInit() {
    }

}
