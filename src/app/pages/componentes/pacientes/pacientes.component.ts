import { Component } from '@angular/core';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';

@Component({
    selector: 'app-pacientes',
    templateUrl: 'pacientes.component.html'
})

export class PacientesComponent{
    pacientes: Pacientes[];
    constructor(
      public serviciosservice: ServiciosService
    ) {}
  
    ngOnInit(): void {
      this.listarPacientes();
    }
  
    listarPacientes() {
      this.serviciosservice
        .listarPacientes()
        .subscribe((dato) => console.log((this.pacientes = dato)));
    }
}