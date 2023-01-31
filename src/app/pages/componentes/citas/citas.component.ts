
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';

@Component({
    selector: 'app-citas',
    templateUrl: 'citas.component.html'
})

export class CitasComponent{
    idPaciente;
    pacien:Pacientes;
    paciente:Pacientes[];
        constructor(private route: ActivatedRoute,private router:Router, public serviciosservice: ServiciosService){
    }

    buscarIdPaciente(){
        this.idPaciente = this.route.snapshot.paramMap.get('id');
        console.log(this.idPaciente);
         this.serviciosservice.buscarIdPaciente(this.idPaciente).subscribe(datos => console.log(datos));
        
    
}

    ngOnInit(){
      
       console.log('hola',this.idPaciente) 
    }

  
}