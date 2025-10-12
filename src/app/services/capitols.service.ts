import { Injectable } from '@angular/core';

import capitolsJson from "src/assets/urls/capitols.json";
import especialsJson from "src/assets/urls/especials.json";
import millorsJson from "src/assets/urls/millors-moments.json";

export interface Capitol {
    title: string;
    urlArxiu: string;
    urlPagina: string;
    temporada: number;
    capitol?: number;
    ordre?: number;
    setmana?: number;
}

@Injectable({
    providedIn: 'root',
})
export class CapitolsService {

    public capitols: Capitol[] = capitolsJson as Capitol[];
    public especials: Capitol[] = especialsJson as Capitol[];
    public millors: Capitol[] = millorsJson as Capitol[];

    constructor() {

        this.capitols.reverse();
        this.especials.reverse();
        this.millors.reverse();

        this.capitols.forEach(c => {
            c.title = c.title.split(" - ")[1];
        })
    }

    getLlista(tipus: string): Capitol[] {
        if (tipus == "capitols") return this.capitols;
        if (tipus == "especials") return this.especials;
        if (tipus == "millors") return this.millors;
        return [];
    }
}
