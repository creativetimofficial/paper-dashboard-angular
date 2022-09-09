import { Component } from '@angular/core';
import { Servicios } from 'app/model/servicios';
import { ServiciosService } from 'app/services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: 'servicios.component.html'
})

export class ServiciosComponent {
  servicios: Servicios[];
  collection = [];
  p:number =1 ;
  total:number=0;
  tamano:number=8;
  constructor(public serviciosservice: ServiciosService) {
   this.listarServicios(); 
  }

  ngOnInit(): void {
    this.listarServicios();
  }

  listarServicios() {
    console.log(this.p, this.tamano);
    this.serviciosservice.listarServicios(this.p,this.tamano)
      .subscribe((dato:any) => {
        console.log(dato);
        
        setTimeout(()=>{
          this.servicios = dato.content
          this.total=dato.totalElements
        })
        
      });
  }

  /*
      <dw-propagador
    (propagar)="procesaPropagar($event)"
  > 
  </dw-propagador>*/

}