
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';
import { SeleccioTemporadaService } from 'src/app/services/seleccio-temporada.service';

@Component({
    selector: 'app-descarrega-individual',
    imports: [
        FormsModule,
        ProgressSpinner,
    ],
    templateUrl: './descarrega-individual.html',
    styleUrl: './descarrega-individual.scss'
})
export class DescarregaIndividual {

    public textBuscar = "";
    public llistaFiltrada: Capitol[];

    public desplegablesOberts = [false, false, false, false, false, false];

    constructor(
        public cs: CapitolsService,
        public sts: SeleccioTemporadaService
    ) { }

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

    descarregaTemporada(index: number) {
        window.scrollTo(0, 250);
        this.sts.seleccionar((index + 1) as 1 | 2 | 3 | 4 | 5 | 6);
    }


}
