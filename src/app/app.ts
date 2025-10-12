import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {

    public tabSeleccionat = "capitols";

    constructor(public cs: CapitolsService) {
    
    
    }

}
