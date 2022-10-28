import  {Component,OnInit,Output,EventEmitter,Input} from '@angular/core';
import  {Router} from '@angular/router';
import  {Pacientes} from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import Swal  from 'sweetalert2';

@Component ({
  selector:'app-formulario-pacientes',
  templateUrl: 'formulario-pacientes.component.html'
})

export class FormularioPacientesComponent{

  @Output() propagar= new EventEmitter<Object>() ;
   pacientes :Pacientes= new Pacientes();
  // @Output() mostrar= new EventEmitter<Object>()
  @Input() pacirecibo:Pacientes;





  constructor(public servicioservice:ServiciosService,public router:Router){}

 public guardarPaciente(pacientes:Pacientes){
  this.servicioservice.guardarPacientes(pacientes).subscribe(
    dato=>{
      console.log(dato=this.pacientes);
      Swal.fire(`paciente creado ${this.pacientes.nombre} creado con exito`,'success');
      this.pacientes.nombre=null;
     // this.irPaciente();
    }
    )


 }

 irPaciente(){
  this.propagar.emit(this.pacientes); }


  onSubmit():void{
    this.guardarPaciente(this.pacientes);

  }


ngOnChanges(): void {

 if(this.pacirecibo){
 this.pacientes=this.pacirecibo
 }



  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.

}



}


