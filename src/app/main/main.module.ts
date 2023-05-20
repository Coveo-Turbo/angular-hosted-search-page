import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CoveoModule } from "./coveo/coveo.module";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";

@NgModule({
    declarations: [
        MainComponent,
    ],
    imports: [
        MainRoutingModule,
        CoveoModule,
    ],
    providers: [

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        CoveoModule,
    ]
})
export class MainModule { }