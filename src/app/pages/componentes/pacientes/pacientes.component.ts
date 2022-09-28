
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Pacientes } from 'app/model/pacientes';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';

@Component({
    selector: 'app-pacientes',
    templateUrl: 'pacientes.component.html'
})

export class PacientesComponent{
     id:any;
  paciente: Pacientes[];


      p:number=1;
    tamano:number=8;
    total:number=0;
    @Output() enviar=new EventEmitter<Object>();


    constructor(
      public serviciosservice: ServiciosService, public route:ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.listarPacientes();
    }

    listarPacientes() {
      this.serviciosservice
        .listarPacientes(this.p,this.tamano)
        .subscribe((dato:any)=>{
          console.log(dato);
          setTimeout(()=>{
            this.paciente= dato.content
            this.total=dato.totalElements
          })
        } )

}

buscarIdPaciente(id:number,buscar: any){
 buscar=this.serviciosservice.buscarIdPaciente(id).subscribe(
    dato=>{
      console.log(dato);
      (this.paciente,id)
    }

  )
}






}
