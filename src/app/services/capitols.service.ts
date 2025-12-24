import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, forkJoin, from, mergeMap, of, toArray } from 'rxjs';

import capitolsJson from "src/assets/urls/capitols.json";
import millorsJson from "src/assets/urls/millors-moments.json";

export class Capitol {
    title: string;
    urlArxiu: string;
    urlPagina: string;
    temporada: number;
    capitol?: number;
    setmana?: number;
    mida: number;

    descarregant: boolean = false;
    descarregat: boolean = false;

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

    private capitols: Capitol[] = (capitolsJson as Capitol[]).map(c => Object.assign(new Capitol(), c));
    public capitolsPerTemporades: Capitol[][];
    public millors: Capitol[] = (millorsJson as Capitol[]).map(c => Object.assign(new Capitol(), c));

    public progresDescarrega: {
        descarregats: number,
        total: number,
        arxiuActualDescarregant: Capitol | null;
    } | null = null;

    public seguirDescarregant = false;

    constructor(private http: HttpClient) {

        // Separar JSON capitols per temporades //
        this.capitolsPerTemporades = [[], [], [], [], []];
        this.capitols.forEach((capitol: Capitol) => {
            this.capitolsPerTemporades[capitol.temporada - 1].push(capitol);
        });
    }

    get descarregant() {
        return !!this.progresDescarrega;
    }

    getLlistaFiltrada(textBuscar: string): Capitol[] {
        return [...this.capitols, ...this.millors].filter(c => {
            return (
                c.title.toLowerCase().includes(textBuscar) ||
                c.temporada.toString().includes(textBuscar) ||
                (c.capitol ?? "").toString().includes(textBuscar) ||
                (c.setmana ?? "").toString().includes(textBuscar)
            );
        });
    }

    descarregarCapitol(capitol: Capitol) {
        capitol.descarregant = true;
        
        this.http.get(capitol.urlArxiu, { responseType: 'blob' }).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = capitol.nomArxiu || 'fitxer.mp3';
                link.click();
                window.URL.revokeObjectURL(url);
                
                setTimeout(() => {
                    capitol.descarregat = true;
                }, 500);
            },
            error: (err) => {
                console.error('Error descarregant arxiu:', err);
            },
            complete: () => {
                setTimeout(() => {
                    capitol.descarregant = false;
                }, 500);
            }
        });
    }

    descarregarCapitols(capitols: Capitol[]) {
        const MAX_CONCURRENT = 5;
        this.progresDescarrega = { descarregats: 0, total: capitols.length, arxiuActualDescarregant: null };
        this.seguirDescarregant = true;

        const descarregarCapitol = (capitol: Capitol) => {
            return this.http.get(capitol.urlArxiu, { responseType: 'blob' }).pipe(
                mergeMap((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = capitol.nomArxiu || 'fitxer.mp3';
                    link.click();
                    window.URL.revokeObjectURL(url);

                    this.progresDescarrega!.descarregats++;
                    
                    this.progresDescarrega!.arxiuActualDescarregant = capitol;
                    console.log(capitol.title);

                    capitol.descarregat = true;

                    return from([true]);
                }),
                catchError(err => {
                    console.error('Error al descargar:', capitol.nomArxiu, err);
                    return from([false]);
                })
            );
        };

        // Processar el capítols de 5 en 5 en paralel //
        const lots: Capitol[][] = [];
        for (let i = 0; i < capitols.length; i += MAX_CONCURRENT) {
            lots.push(capitols.slice(i, i + MAX_CONCURRENT));
        }

        (async () => {
            for (const lot of lots) {
                if (!this.seguirDescarregant) break;
                await forkJoin(lot.map(descarregarCapitol)).pipe(toArray()).toPromise();
            }
            this.progresDescarrega = null;
        })();
    }

    descarregarCapitolsTest(capitols: Capitol[], ms: number = 300) {
        const MAX_CONCURRENT = 1;
        this.progresDescarrega = { descarregats: 0, total: capitols.length, arxiuActualDescarregant: null };
        this.seguirDescarregant = true;

        const descarregarCapitol = (capitol: Capitol) => {
            return of(null).pipe(
                delay(ms),
                mergeMap(() => {
                    const blob = new Blob([`Simulació ${capitol.nomArxiu}`]);
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = (capitol.nomArxiu || 'fitxer.mp3').replace('.mp3', ' - mock.mp3');
                    // link.click();
                    window.URL.revokeObjectURL(url);

                    this.progresDescarrega!.descarregats++;

                    this.progresDescarrega!.arxiuActualDescarregant = capitol;
                    console.log(capitol.title);
                    
                    capitol.descarregat = true;

                    return from([true]);
                }),
                catchError(err => {
                    return from([false]);
                })
            );
        };

        const lots: Capitol[][] = [];
        for (let i = 0; i < capitols.length; i += MAX_CONCURRENT) {
            lots.push(capitols.slice(i, i + MAX_CONCURRENT));
        }

        (async () => {
            for (const lot of lots) {
                if (!this.seguirDescarregant) break;
                await forkJoin(lot.map(descarregarCapitol)).toPromise();
            }
            this.progresDescarrega = null;
        })();
    }

}
