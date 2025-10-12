import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import capitolsJson from "src/assets/urls/capitols.json";
import especialsJson from "src/assets/urls/especials.json";
import millorsJson from "src/assets/urls/millors-moments.json";

export class Capitol {
    title: string;
    urlArxiu: string;
    urlPagina: string;
    temporada: number;
    capitol?: number;
    ordre?: number;
    setmana?: number;

    get titolMostrar() {
        return this.title.includes(" - ") ? this.title.split(" - ")[1] : this.title;
    }
    get nomArxiu() {
        return this.title
            .replaceAll("\"", "'")
            .replaceAll("?", ".") + ".mp3";
    }
}

@Injectable({
    providedIn: 'root',
})
export class CapitolsService {

    public capitols: Capitol[] = (capitolsJson as Capitol[]).map(c => Object.assign(new Capitol(), c));
    public especials: Capitol[] = (especialsJson as Capitol[]).map(c => Object.assign(new Capitol(), c));
    public millors: Capitol[] = (millorsJson as Capitol[]).map(c => Object.assign(new Capitol(), c));

    constructor(private http: HttpClient) {

        this.capitols.reverse();
        this.especials.reverse();
        this.millors.reverse();
    }

    getLlista(tipus: string): Capitol[] {
        if (tipus == "capitols") return this.capitols;
        if (tipus == "especials") return this.especials;
        if (tipus == "millors") return this.millors;
        return [];
    }

    descarregar(capitol: Capitol) {
        this.http.get(capitol.urlArxiu, { responseType: 'blob' }).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = capitol.nomArxiu || 'fitxer.mp3';
                link.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                console.error('Error descarregant arxiu:', err);
            }
        });
    }
}
