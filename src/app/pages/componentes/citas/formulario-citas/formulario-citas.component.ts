import  {Component,OnInit,Output,EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  {ActivatedRoute, Router, RouterLink} from '@angular/router';
import  {Citas} from 'app/model/citas';
import { Pacientes } from 'app/model/pacientes';
import  {Servicios} from 'app/model/servicios'
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

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
    cita:Citas= new Citas;
    paciente:Pacientes;
    dateControl:'';
   //s:Servicios;
    @Input() pacienr:Pacientes;
    @Input() servicir:Servicios;
    @Input() citarecibo:Citas;
    

    @Output() propagarCita= new EventEmitter<Object>();
     idPacienteUrl:any;
    constructor(public servicioservice:ServiciosService,public router:Router,public route:ActivatedRoute,public fb:FormBuilder){
      this.idPacienteUrl = this.route.snapshot.paramMap.get('id');
      

      this.formCitas=this.fb.group({
        id:'',
        servicio:'',
            estado:'',
           //fecha:'',
            
            //  id:'',
            fecha:['', [
              Validators
              .required,
              // validates date format yyyy-mm-dd with regular expression
              Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
          ]]
            
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
            this.irCitas();


        })
    }
    irCitas(){
      this.propagarCita.emit(this.cita);
    }

    listServiciosp(){
      this.servicioservice.listserviciosp().subscribe(dato=>
        {
          console.log('servi123',this.servicios=dato)
        })
    }   



    onSubmit():void{
      this.guardarCitas(this.formCitas);        
    }
    comparaServicio(s1:Servicios,s2:Servicios){
     return  s1== null || s2==null || s1==undefined || s2== undefined ?false : s1.eid === s2.eid ;
    }

   ngOnInit(): void {
     
     this.listServiciosp();
    
     
    }

   


    ngOnChanges():void{
      
      if(this.citarecibo){
   this.formCitas.patchValue(this.citarecibo);
      }
      else  this.cita=new Citas();{
      
      }

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
