import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-pacientes',
  templateUrl: 'formulario-pacientes.component.html'
})

export class FormularioPacientesComponent {

  @Output() propagar = new EventEmitter<Object>();
  
  public formCamilo:FormGroup;

  pacientes: Pacientes = new Pacientes();
  @Input() pacirecibo: Pacientes;

  constructor(public servicioservice: ServiciosService, public router: Router, private fb:FormBuilder) { 

    this.formCamilo = this.fb.group({
      id:'',
      cedula:'',
      nombre:'',
      apellidos: '',
      direccion: '',
      telefono: '',
      entidad: ''
    })
  }

  ngOnInit(){
   
  }

  public guardarPaciente(paci:any) {
    
    this.servicioservice.guardarPacientes(paci.value).subscribe(
      dato => {
        console.log("guardarPacienteee",paci);
       Swal.fire('paciente creado', `pacientes ${(paci.value.nombre) }  ${paci.value.apellidos} creado con exito`, 'success');
       this.formCamilo.reset();
      
       this.pacientes.nombre = null;
         this.irPaciente();
      }
    )
  }

  irPaciente() {
    this.propagar.emit(this.pacientes);
  }


  onSubmit(): void {
    this.guardarPaciente(this.formCamilo);

  }

  nuevoPaciente(){
    this.formCamilo.reset();
  }
  
  ngOnChanges(): void {
    if(this.pacirecibo){
      this.formCamilo.patchValue(this.pacirecibo);
    }else{
      this.pacientes=new Pacientes();
    }
  }
}