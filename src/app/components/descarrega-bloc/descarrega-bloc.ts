
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { CapitolsService } from 'src/app/services/capitols.service';

@Component({
    selector: 'app-descarrega-bloc',
    imports: [
        FormsModule,
        SliderModule,
        ProgressSpinner,
    ],
    templateUrl: './descarrega-bloc.html',
    styleUrl: './descarrega-bloc.scss'
})
export class DescarregaBloc {

    public tipus: string;
    public rangCapitols: number[] = [0, 19];
    public llistes = {};


    constructor(public cs: CapitolsService) {
        this.llistes = {
            temporada1: cs.capitols.filter(c => c.temporada == 1),
            temporada2: cs.capitols.filter(c => c.temporada == 2),
            temporada3: cs.capitols.filter(c => c.temporada == 3),
            temporada4: cs.capitols.filter(c => c.temporada == 4),
            temporada5: cs.capitols.filter(c => c.temporada == 5),
            especials: cs.especials,
            millors: cs.millors,
        };
    }

    get capitolsSeleccionats() {
        return this.llistaActual.slice(this.rangCapitols[0], this.rangCapitols[1] + 1);
    }

    get llistaActual() {
        return this.llistes[this.tipus];
    }

    get maxRang() {
        return this.llistaActual.length-1;
    }

    resetSlider() {
        this.rangCapitols = [0, Math.min(this.maxRang, 19)];
    }

    descarregar() {
        this.cs.descarregarCapitols(this.capitolsSeleccionats);
    }
}
