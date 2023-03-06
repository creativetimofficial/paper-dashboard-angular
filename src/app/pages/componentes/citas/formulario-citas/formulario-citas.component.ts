import  {Component,OnInit,Output,EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import  {ActivatedRoute, Router, RouterLink} from '@angular/router';
import  {Citas} from 'app/model/citas';
import { Pacientes } from 'app/model/pacientes';
import  {Servicios} from 'app/model/servicios'
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-formulario-citas',
  templateUrl: 'formulario-citas.component.html'
})
export class FormularioCitasComponent{
    formCitas: FormGroup;
    idPaciente;
    servicios:Servicios[];
   // servicio:Servicios;
    p:number=1;
    tamano:number=8;
    total:number=0;
    cita:Citas;
    paciente:Pacientes;
   //s:Servicios;
    @Input() pacienr:Pacientes;
    @Input() servicir:Servicios;
    

    @Output() propagarCita= new EventEmitter<Object>();
     idPacienteUrl:any;
    constructor(public servicioservice:ServiciosService,public router:Router,public route:ActivatedRoute,public fb:FormBuilder){
      this.idPacienteUrl = this.route.snapshot.paramMap.get('id');
      
      this.formCitas=this.fb.group({
            
            id_cita:'',
            estado:'',
            fecha:'',
            //  id:'',
             servicio:''
        }          
        );
        //this.formCitas.get('servicio').contro valueChanges((value)=>console.log(value))

        console.log('formulario',this.formCitas);

    }
    guardarCitas(cita:any){
     console.log('guardarCitas',cita.value);

     cita.value.paciente
      = {'id':this.idPacienteUrl};
        this.servicioservice.guardarCita(cita.value).subscribe(dato=>{
            console.log(dato);
           
           
            Swal.fire('creado correctamente')
            this.formCitas.reset();
            this.cita=null;


        })
    }

    listServiciosp(){
      this.servicioservice.listserviciosp().subscribe(dato=>
        {
          console.log('servi123',this.servicios=dato)
        })
    }   


   irCitas(){
       console.log('listarcita12',this.propagarCita.emit(this.cita));
    }

    onSubmit():void{
      this.guardarCitas(this.formCitas)
        
    }

    ngOnInit(): void {
      this.listServiciosp();
    
    }


   

   /* ngOnchanges():void{
        if(this.pacienr){
        }
      else(this.pacienr=null)
   }
   ngOnchanges():void{
    if(this.servicio){
    }
  else(this.servicio
    =null)
}*/
}
