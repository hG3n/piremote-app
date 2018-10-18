import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SwitchListComponent} from './switch-list/switch-list.component';
import {SwitchListTileComponent} from './switch-list-tile/switch-list-tile.component';
import {HttpClientModule} from '@angular/common/http';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatBottomSheetModule,
    MatButtonModule, MatDialogModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {InteractionService} from './interaction.service';
import {DbService} from './db.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModularDialogComponent} from './modular-dialog/modular-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        SwitchListComponent,
        SwitchListTileComponent,
        HomeComponent,
        ModularDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatDialogModule,
        MatInputModule,
        FormsModule
    ],
    providers: [
        InteractionService,
        DbService,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
    entryComponents: [ModularDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
