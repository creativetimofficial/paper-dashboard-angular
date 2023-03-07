
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import { Citas } from 'app/model/citas';
import { Servicios } from 'app/model/servicios';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-citas',
    templateUrl: 'citas.component.html'
})

export class CitasComponent{
    idPaciente;
    pacientes:Pacientes;
    paciente:any;
    pa:Pacientes;
    servicio:Servicios[];
    citas:Citas[];
    cita:Citas;
    p:number =1 ;
    total:number=0;
    tamano:number=8;
    servi:Servicios;
     @Input() idservicio:Servicios;   
    @Input() idrecibo:Pacientes;
        constructor(private route: ActivatedRoute,public servicioservice:ServiciosService,private router:Router, public serviciosservice: ServiciosService){
        
    }

  

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

  /*  listarServicios() {
        console.log(this.p, this.tamano);
        this.servicioservice.listarServicios(this.p,this.tamano)
          .subscribe((dato:any) => {
            console.log(this.servicio=dato);
            setTimeout(()=>{
              this.servicio = dato.content
              this.total=dato.totalElements
            })
    
          });
      }*/

  
    listarCitas(){
        this.serviciosservice.listarCitas().subscribe(
            dato=>{
                console.log('cita321',this.citas=dato);
            }
        )
    }
   ircc(){
    
   }
    ngOnchanges():void{
      if(this.servicio){
       
      }
      else{
       this.servicio=null   
      }
    }
  

  
}