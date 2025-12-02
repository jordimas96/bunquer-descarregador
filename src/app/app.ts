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
    public llistaCapitols: Capitol[];

    public tabSeleccionat = "capitols";

    public textNumCapitol: any = "Cap.";

    public scrolled: boolean;

    constructor(
        public cs: CapitolsService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
        this.actLlista();
    }

    get textNumResultats() {
        if (this.llistaCapitols.length == 1) return "1 resultat";
        else return this.llistaCapitols.length + " resultats";
    }

    actLlista() {
        if (this.textBuscar)
            this.llistaCapitols = this.cs.getLlistaFiltrada(this.textBuscar.toLowerCase());
        else
            this.llistaCapitols = this.cs.getLlista(this.tabSeleccionat);
        
        this.actTextCapitol();
    }

    actTextCapitol() {
        this.textNumCapitol = [];
        let teCap = this.textNumCapitol[0] = this.llistaCapitols.some(c => c.capitol);
        let teSet = this.textNumCapitol[1] = this.llistaCapitols.some(c => c.setmana);
        if (teCap && teSet) this.textNumCapitol = "Cap. / Set.";
        else if (teCap) this.textNumCapitol = "Cap.";
        else if (teSet) this.textNumCapitol = "Setmana";
        else this.textNumCapitol = "Cap.";
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
