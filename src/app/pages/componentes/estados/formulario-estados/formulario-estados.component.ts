import { ServiciosService } from "app/services/servicios.service";
import {Component, Output,EventEmitter,Input} from '@angular/core';
import  {Router} from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Estados } from "app/model/estados";
import Swal from "sweetalert2";
import { Route } from "@angular/router";


@Component({
selector: 'app-formulario-estados',
templateUrl: 'formulario-estados.component.html'
})



export class FormularioEstadosComponent{

    formEstado:FormGroup;
    estado:Estados= new Estados;
    @Output() propagares= new EventEmitter<Object>();
    @Input() estarecibo:Estados;

    constructor(public serviceservice:ServiciosService,public router:Router,public fb:FormBuilder){
        this.formEstado=fb.group({
            id:'',
            nombre:''
        })
    }

    guardarEstado(estado:any){
        this.serviceservice.guardarEstado(estado.value).subscribe(dato=>{
            console.log(estado);
            Swal.fire(`mensaje,${estado.value.nombre} correctamente`);
       
        this.formEstado.reset();
        this.estado.nombre=null;
        this.eventoEstado(); 
    })
    }


    eventoEstado(){
        this.propagares.emit(this.estado);
    }

    onSumit():void{
        this.guardarEstado(this.formEstado);
    }

    resetEstado(){
        this.formEstado.reset();
    }

    ngOnChanges(){
       if( this.estarecibo){
        this.formEstado.patchValue(this.estarecibo);
       
       } 
       else{
        this.estado = new Estados();
       }
    }

}