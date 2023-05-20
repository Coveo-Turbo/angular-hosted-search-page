import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    public context: any = {};
    public searchHub = environment.coveo.searchHub;
}
