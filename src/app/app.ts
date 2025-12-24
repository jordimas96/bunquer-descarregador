import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Capitol, CapitolsService } from 'src/app/services/capitols.service';
import { DescarregaBloc } from './components/descarrega-bloc/descarrega-bloc';

@Component({
    selector: 'app-root',
    imports: [ProgressSpinner, FormsModule],
    providers: [DialogService],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

    private modalRef: DynamicDialogRef<DescarregaBloc> | null;

    public textBuscar = "";
    public llistaFiltrada: Capitol[];

    public desplegablesOberts = [false, false, false, false, false, false];

    public scrolled: boolean;

    constructor(
        public cs: CapitolsService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
    }

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

    obrirModal() {
        this.modalRef = this.dialogService.open(DescarregaBloc, {
            styleClass: "modal-descarrega-bloc",
            modal: true,
            dismissableMask: true,
        });

        document.body.style.paddingRight = window.innerWidth > 767 ? "23px" : "8px";

        this.modalRef?.onDestroy.subscribe(() => {
            document.body.style.paddingRight = "";
        });



    }
    ngOnDestroy() {
        if (this.modalRef) {
            this.modalRef.close();
        }
    }


    @HostListener('window:scroll')
    onScroll() {
        this.scrolled = window.scrollY > 150;
    }

}
