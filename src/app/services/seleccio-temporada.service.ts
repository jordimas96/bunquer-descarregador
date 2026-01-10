import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SeleccioTemporadaService {

    public seleccio = {
        temporada1: false,
        temporada2: false,
        temporada3: false,
        temporada4: false,
        temporada5: false,
        millors: false,
    }

    public seleccioChange = new BehaviorSubject(this.seleccio);
    public seleccioChange$ = this.seleccioChange.asObservable();

    get seleccioBuida(): boolean {
        return Object.values(this.seleccio).every(v => v === false);
    }

    esborrarSeleccio() {
        this.seleccio = {
            temporada1: false,
            temporada2: false,
            temporada3: false,
            temporada4: false,
            temporada5: false,
            millors: false,
        }

        this.seleccioChange.next(this.seleccio);
    }

    seleccionarLes5() {
        this.seleccio = {
            temporada1: true,
            temporada2: true,
            temporada3: true,
            temporada4: true,
            temporada5: true,
            millors: false,
        }

        this.seleccioChange.next(this.seleccio);
    }

    seleccionar(num: 1 | 2 | 3 | 4 | 5 | 6) {
        this.seleccio = {
            temporada1: false,
            temporada2: false,
            temporada3: false,
            temporada4: false,
            temporada5: false,
            millors: false,
        }

        if (num != 6) this.seleccio["temporada" + num] = true;
        else this.seleccio.millors = true;

        this.seleccioChange.next(this.seleccio);
    }

}
