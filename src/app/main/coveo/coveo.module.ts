import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CoveoComponent } from "./coveo.component";

@NgModule({
  declarations: [
    CoveoComponent,
  ],
  imports: [],
  providers: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CoveoComponent,
  ]
})
export class CoveoModule { }