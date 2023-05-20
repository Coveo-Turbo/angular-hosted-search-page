import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule { }