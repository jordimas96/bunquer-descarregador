
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { Subscription } from 'rxjs';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';
import { SeleccioTemporadaService } from 'src/app/services/seleccio-temporada.service';

@Component({
    selector: 'app-descarrega-multiple',
    imports: [
        SliderModule,
        FormsModule,
    ],
    templateUrl: './descarrega-multiple.html',
    styleUrl: './descarrega-multiple.scss'
})
export class DescarregaMultiple implements OnInit, OnDestroy {

    public readonly llistes: any;

    public readonly botonsTemporades = [
        { id: "temporada1", text: "Temporada 1" },
        { id: "temporada2", text: "Temporada 2" },
        { id: "temporada3", text: "Temporada 3" },
        { id: "temporada4", text: "Temporada 4" },
        { id: "temporada5", text: "Temporada 5" },
        { id: "millors", text: "Millors moments" },
    ];

    public readonly bytesDescarregatsPerSegon = 1752911680 / 60;

    public llistaSeleccionada: Capitol[] = [];

    public rangCapitols: number[] = [0, this.maxRang];


    constructor(
        public cs: CapitolsService,
        public sts: SeleccioTemporadaService
    ) {
        this.llistes = {
            temporada1: cs.capitolsPerTemporades[0],
            temporada2: cs.capitolsPerTemporades[1],
            temporada3: cs.capitolsPerTemporades[2],
            temporada4: cs.capitolsPerTemporades[3],
            temporada5: cs.capitolsPerTemporades[4],
            millors: cs.millors,
        };
    }

    private subscripcio: Subscription;
    ngOnInit() {
        this.subscripcio = this.sts.seleccioChange$.subscribe(() => {
            this.seleccioChange();
        });
    }
    ngOnDestroy() {
        this.subscripcio.unsubscribe();
    }

    get maxRang(): number {
        return this.llistaSeleccionada.length - 1;
    }

    get capitolsSeleccionats(): Capitol[] {
        return this.llistaSeleccionada.slice(this.rangCapitols[0], this.rangCapitols[1] + 1);
    }

    get midaDescarrega() {
        let mida = 0;
        this.capitolsSeleccionats.forEach(capitol => mida += capitol.mida);
        return mida;
    }
    get midaDescarregaString() {
        let mida = this.midaDescarrega;
        const unitats = ["B", "KB", "MB", "GB", "TB"];
        let index = 0;

        while (mida >= 1024 && index < unitats.length - 1) {
            mida = mida / 1024;
            index++;
        }

        return `${mida.toFixed(2)} ${unitats[index]}`;
    }

    get tempsEstimatDescarregaString() {
        // MOLT aproximat //
        let segons = Math.round(this.midaDescarrega / this.bytesDescarregatsPerSegon);
        const minuts = Math.floor(segons / 60);
        const restSegons = segons % 60;

        if (minuts > 0 && restSegons > 0) {
            return `~ ${minuts}min i ${restSegons}s`;
        } else if (minuts > 0) {
            return `~ ${minuts}min`;
        } else {
            return `~ ${restSegons}s`;
        }
    }

    get tempsRestantString() {
        let midaRestant = this.midaDescarrega * (1 - this.cs.progresDescarrega!.descarregats / this.cs.progresDescarrega!.total);

        let segons = Math.round(midaRestant / this.bytesDescarregatsPerSegon);
        const minuts = Math.floor(segons / 60);
        const restSegons = segons % 60;

        if (minuts > 0 && restSegons > 0) {
            return `${minuts}min i ${restSegons}s`;
        } else if (minuts > 0) {
            return `${minuts}min`;
        } else {
            return `${restSegons}s`;
        }
    }

    seleccioChange() {
        this.llistaSeleccionada = [];
        Object.keys(this.sts.seleccio).forEach(nomLlista => {
            if (this.sts.seleccio[nomLlista]) {
                this.llistaSeleccionada.push(...this.llistes[nomLlista]);
            }
        });

        // Reset slider //
        this.rangCapitols = [0, this.maxRang];
    }

    descarregar() {
        this.cs.descarregarCapitols(this.capitolsSeleccionats);
    }
    cancelar() {
        this.cs.seguirDescarregant = false;
    }


}
