
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CapitolsService } from 'src/app/services/capitols.service';

@Component({
    selector: 'app-descarrega-bloc',
    imports: [
        FormsModule,
        SliderModule
    ],
    templateUrl: './descarrega-bloc.html',
    styleUrl: './descarrega-bloc.scss'
})
export class DescarregaBloc {

    public tipus: string;
    public rangCapitols: number[] = [0, 19];
    public llistaEpisodis


    constructor(public cs: CapitolsService) {

    }

    get llistaSelecionada() {
        return this.cs[this.tipus];
    }

    get maxRang() {
        return this.llistaSelecionada.length-1;
    }

    resetSlider() {
        this.rangCapitols = [0, Math.min(this.maxRang, 19)];
    }

    descarregar() {
        
    }
}
