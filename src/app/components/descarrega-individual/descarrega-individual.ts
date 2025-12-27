
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';

@Component({
    selector: 'app-descarrega-individual',
    imports: [
        ProgressSpinner,
        FormsModule,
        SliderModule,
    ],
    templateUrl: './descarrega-individual.html',
    styleUrl: './descarrega-individual.scss'
})
export class DescarregaIndividual {

    public textBuscar = "";
    public llistaFiltrada: Capitol[];

    public desplegablesOberts = [false, false, false, false, false, false];

    constructor(public cs: CapitolsService) { }

    get llistaPerTemporades() {
        return [...this.cs.capitolsPerTemporades, this.cs.millors];
    }

    get textNumResultats() {
        if (this.llistaFiltrada.length == 1) return "1 resultat";
        else return this.llistaFiltrada.length + " resultats";
    }

    actLlistaFiltrada() {
        this.llistaFiltrada = this.cs.getLlistaFiltrada(this.textBuscar.toLowerCase());
    }


}
