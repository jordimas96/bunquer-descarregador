import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DescarregaIndividual } from './components/descarrega-individual/descarrega-individual';
import { DescarregaMultiple } from './components/descarrega-multiple/descarrega-multiple';
import { Footer } from './components/footer/footer';

@Component({
    selector: 'app-root',
    imports: [DescarregaIndividual, Footer],
    providers: [DialogService],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

    private modalRef: DynamicDialogRef<DescarregaMultiple> | null;

    public scrolled: boolean;

    constructor(private dialogService: DialogService) { }

    ngOnInit(): void { }

    obrirModal() {
        this.modalRef = this.dialogService.open(DescarregaMultiple, {
            styleClass: "modal-descarrega-multiple",
            modal: true,
            dismissableMask: true,
        });

        document.body.style.paddingRight = window.innerWidth > 767 ? "23px" : "8px";

        this.modalRef?.onDestroy.subscribe(() => {
            document.body.style.paddingRight = "";
        });
    }

    ngOnDestroy() {
        this.modalRef?.close();
    }


    @HostListener('window:scroll')
    onScroll() {
        this.scrolled = window.scrollY > 150;
    }

}
