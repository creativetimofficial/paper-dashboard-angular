
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import { Citas } from 'app/model/citas';
import { Servicios } from 'app/model/servicios';

import Swal from 'sweetalert2';
import { Estados } from 'app/model/estados';


@Component({
    selector: 'app-citas',
    templateUrl: 'citas.component.html'
})

export class CitasComponent{
    idPaciente;
    pacientes:Pacientes[];
    paciente:Pacientes;
    pa:Pacientes;
    servicio:Servicios[];
    citas:Citas[];
    cita:Citas;
    query: '';
    estado:Estados;
  
 
    filterpost:'';
    p:number =1 ;
    total:number=0;
    tamano:number=8;
    servi:Servicios;
     @Input() idservicio:Servicios;   
     @Input() idrecibo:Pacientes;
   
    

        constructor(private route: ActivatedRoute,public servicioservice:ServiciosService,private router:Router, public serviciosservice: ServiciosService)
        { }

  

    buscarIdPaciente(){
        this.idPaciente = this.route.snapshot.paramMap.get('id');
        this.servicioservice.buscarIdPaciente(this.idPaciente).subscribe(
          dato=>{
            console.log(this.paciente=dato)
          }
        )
      console.log('hola5',  this.pa=this.idPaciente);
      console.log('hol6',this.paciente=this.pa)
       

    }

    ngOnInit():void{
      this.buscarIdPaciente();
      this.listarCitas();  
     
    }

    seleccionCita(c:Citas){
   

      console.log('seleccionCita',this.cita=c);

    }

  
    listarCitas(){
    
        this.serviciosservice.listarCitas(this.p,this.tamano).subscribe(
            (dato:any)=>{
                console.log(dato);
                setTimeout(()=>{
                  this.citas= dato.content
                  this.total=dato.totalElements
                })
              
       
            })
  }


  listarFiltro(){
    this.servicioservice.filtrarId(this.query).subscribe(
      (dato:any)=> {
      console.log('filtro',dato);
      setTimeout(()=>{
        this.citas= dato.content
        this.total=dato.totalElements
      })

    })

  }

OnSubmit():void{
  this.listarFiltro();

}
   
   /*irCita(c:any){
    console.log(this.cita=c);
   }*/

  
    ngOnchanges():void{
      if(this.servicio){
       
      }
      else{
       this.servicio=null   
      }
    }
  

  
}