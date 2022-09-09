import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Servicios } from 'app/model/servicios';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-formulario-servicios',
    templateUrl: 'formulario-servicios.component.html'
})

export class FormularioServiciosComponent {

    //EventEmitter
    //Output
    //Input
    @Output() propagar = new EventEmitter<Object>();
    servicios: Servicios = new Servicios();
    constructor(public servicioservice: ServiciosService, public route: Router) { }


    public guardarServicio() {

        this.servicioservice.guardarServicios(this.servicios).subscribe(dato => {
            console.log(this.servicios)
            Swal.fire('Nuevo servicio',
                `servicio ${this.servicios.nombre} creado con exito`,
                'success'
            );

            this.servicios.nombre = null;
            this.irServicio();

        }
        )

    }

    public irServicio() {
        this.propagar.emit(this.servicios);
    }

    public onSumit(): void {
        this.guardarServicio();
    }

}