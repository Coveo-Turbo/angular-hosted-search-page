import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
    {
        path: "",
        component: MainComponent
    },
    {
        path: "**",
        component: MainComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [

    ]
})
export class MainRoutingModule {

}