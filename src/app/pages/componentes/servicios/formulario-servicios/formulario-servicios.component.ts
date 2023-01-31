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

    public formservicios:FormGroup;
    @Output() propagar = new EventEmitter<Object>();
    @Input() servirecibo:Servicios;
    servicios: Servicios = new Servicios();
    constructor(public servicioservice: ServiciosService, public route: Router,private fb:FormBuilder) { 
        this.formservicios=this.fb.group({
        eid:'',
        nombre:''
        })
    }

    public guardarServicio(servi:any) {
        console.log(servi)
        this.servicioservice.guardarServicios(servi.value).subscribe(dato => {
            console.log("Guardarservicio",servi)
            Swal.fire('Nuevo servicio',
                `servicio ${servi.value.nombre} creado con exito`,
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