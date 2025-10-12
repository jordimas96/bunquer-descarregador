import { Injectable } from '@angular/core';

import capitolsJson from "src/assets/urls/capitols.json";
import especialsJson from "src/assets/urls/especials.json";
import millorsMomentsJson from "src/assets/urls/millors-moments.json";

export interface Capitol {
    title: string;
    urlArxiu: string;
    urlPagina: string;
    temporada: number;
    capitol: number
    // tipus: string
}

@Injectable({
    providedIn: 'root',
})
export class CapitolsService {

    public capitols = capitolsJson;
    public especials = especialsJson;
    public millorsMoments = millorsMomentsJson;

    constructor() {

        this.capitols.reverse();

        this.capitols.forEach(c => {
            c.title = c.title.split(" - ")[1];
        })
    }
}
