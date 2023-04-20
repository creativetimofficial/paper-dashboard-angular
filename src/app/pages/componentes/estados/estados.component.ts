import { Component } from "@angular/core";
import { ActivatedRoute, Route, Router, RouterLink } from "@angular/router";
import { Estados } from "app/model/estados";
import { ServiciosService } from "app/services/servicios.service";

@Component({
    selector: 'app-estados',
    templateUrl: 'estados.component.html'
})




export class EstadosComponent{ 

    p:number=1;
    total:number=0;
    tamano:number=8;
    estados:Estados[];
    estado:Estados;
    constructor(public servicioservice:ServiciosService,public route:ActivatedRoute,public router:Router){}

    listarEstados(){
        this.servicioservice.listarEstados(this.p,this.tamano).subscribe((dato:any) =>{
        console.log(dato);        
        setTimeout(()=>{
            this.estados= dato.content
            this.total=dato.totalElements
        })
    })
    }

    ngOnInit(): void {
        this.listarEstados();
      }
  
selectEstado(es:Estados){
    console.log(this.estado=es);
}


}