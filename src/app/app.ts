import { Component, HostListener } from '@angular/core';
import { DescarregaIndividual } from './components/descarrega-individual/descarrega-individual';
import { DescarregaMultiple } from './components/descarrega-multiple/descarrega-multiple';
import { Footer } from './components/footer/footer';

@Component({
    selector: 'app-root',
    imports: [DescarregaMultiple, DescarregaIndividual, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {

    public scrolled: boolean;

    constructor() { }


    @HostListener('window:scroll')
    onScroll() {
        this.scrolled = window.scrollY > 150;
    }

}
