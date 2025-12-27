import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DescarregaBloc } from './components/descarrega-bloc/descarrega-bloc';
import { DescarregaIndividual } from './components/descarrega-individual/descarrega-individual';

@Component({
    selector: 'app-root',
    imports: [FormsModule, DescarregaIndividual],
    providers: [DialogService],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

    private modalRef: DynamicDialogRef<DescarregaBloc> | null;

    public scrolled: boolean;

    constructor(private dialogService: DialogService) { }

    ngOnInit(): void { }

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
