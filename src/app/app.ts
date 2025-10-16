import { Component, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CapitolsService } from 'src/app/services/capitols.service';
import { DescarregaBloc } from './components/descarrega-bloc/descarrega-bloc';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-root',
    imports: [ProgressSpinner],
    providers: [DialogService],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnDestroy {

    private ref: any;

    public tabSeleccionat = "capitols";

    constructor(
        public cs: CapitolsService,
        private dialogService: DialogService
    ) {


    }

    obrirModal() {
        this.ref = this.dialogService.open(DescarregaBloc, {
            styleClass: "modal-descarrega-bloc",
            modal: true,
            dismissableMask: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        document.body.style.paddingRight = window.innerWidth > 767 ? "23px" : "8px";

        this.ref.onDestroy.subscribe(() => {
            document.body.style.paddingRight = "";
        });
        


    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

}
