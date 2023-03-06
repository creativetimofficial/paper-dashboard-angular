import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Servicios } from 'app/model/servicios';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-formulario-servicios',
    templateUrl: 'formulario-servicios.component.html'
})

export class FormularioServiciosComponent {

     formservicios:FormGroup;

    @Output() propagar = new EventEmitter<Object>();
    @Input() servirecibo:Servicios;
    servicios: Servicios = new Servicios();
   // @Input() servirecibo:Servicios;
    constructor(public servicioservice: ServiciosService, public route: Router,fb:FormBuilder) {
    this.formservicios=fb.group({
     eid:'',
     nombre:''

    })

  }


    public guardarServicio(servicios:any) {

        this.servicioservice.guardarServicios(servicios.value).subscribe(dato => {
            console.log(this.servicios)
            Swal.fire('Nuevo servicio',
                `servicio ${servicios.value.nombre} creado con exito`,
                'success'
            );
            this.formservicios.reset();
            this.servicios.nombre = null;
            this.irServicio();

        }
        )

    }

    public irServicio() {
        this.propagar.emit(this.servicios);
    }

    public onSumit(): void {
        this.guardarServicio(this.formservicios);
    }

    public ngOnChanges(): void {
     if(this.servirecibo){
      this.formservicios.patchValue(this.servirecibo)
    }else{
      this.servicios=new Servicios();
      }

    }

}

