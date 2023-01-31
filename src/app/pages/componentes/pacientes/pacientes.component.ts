
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
  pacientes: Pacientes[];
  pacirecibo:Pacientes;
   p:number=1;
    tamano:number=8;
    total:number=0;
    @Output() enviar=new EventEmitter<Object>();
    pacien:Pacientes;


    constructor(
      public serviciosservice: ServiciosService, public route:ActivatedRoute, private router:Router
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
            this.pacientes= dato.content
            this.total=dato.totalElements
          })
        } )

}

buscarIdPaciente(pa:Pacientes){
console.log(this.pacien=pa);

}


citaPaciente(id:number){
  console.log(id);
   this.router.navigate([`/citas/${id}`], { relativeTo: this.route });
}

/* realiza el filtro falta desde listar
capturarString(filtro){
  listarPacientes(filtro)
}*/

}
