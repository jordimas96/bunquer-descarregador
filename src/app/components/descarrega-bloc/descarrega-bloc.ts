
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';

@Component({
    selector: 'app-descarrega-bloc',
    imports: [
        FormsModule,
        SliderModule,
    ],
    templateUrl: './descarrega-bloc.html',
    styleUrl: './descarrega-bloc.scss'
})
export class DescarregaBloc {

    public readonly llistes: any;

    public readonly botonsTemporades = [
        { id: "temporada1", text: "Temporada 1" },
        { id: "temporada2", text: "Temporada 2" },
        { id: "temporada3", text: "Temporada 3" },
        { id: "temporada4", text: "Temporada 4" },
        { id: "temporada5", text: "Temporada 5" },
        { id: "especials", text: "Especials" },
        { id: "millors", text: "Millors" },
    ];

    public llistaSeleccionada: Capitol[] = [];

    public rangCapitols: number[] = [0, this.maxRang];

    public seleccio = {
        temporada1: true,
        temporada2: true,
        temporada3: true,
        temporada4: true,
        temporada5: true,
        especials: true,
        millors: false,
    }


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

        this.seleccioChange();
    }

    get maxRang(): number {
        return this.llistaSeleccionada.length - 1;
    }

    get capitolsSeleccionats(): Capitol[] {
        return this.llistaSeleccionada.slice(this.rangCapitols[0], this.rangCapitols[1] + 1);
    }

    seleccioChange() {
        this.llistaSeleccionada = [];
        Object.keys(this.seleccio).forEach(nomLlista => {
            if (this.seleccio[nomLlista]) {
                this.llistaSeleccionada.push(...this.llistes[nomLlista]);
            }
        })

        // Reset slider //
        this.rangCapitols = [0, this.maxRang];
    }

    descarregar() {
        this.cs.descarregarCapitols(this.capitolsSeleccionats);
    }
}
