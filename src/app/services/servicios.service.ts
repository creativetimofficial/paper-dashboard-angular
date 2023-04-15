import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Servicios } from '../model/servicios';
import { catchError, identity, map, Observable, throwError } from 'rxjs';
import { Pacientes } from '../model/pacientes';
import { Citas } from '../model/citas';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
URL_BACKEND='http://localhost:8080/';
servicios:Servicios[];
pacientes:Pacientes[];
citas:Citas[];
eid:number;
nombre:String

  constructor(public http: HttpClient) { }


  listarServicios(pagina:number ,size:number){
    return this.http.get<Servicios[]>(this.URL_BACKEND+`api/servicios/consultar/${(pagina?pagina:1)-1},${size}`);
  }

  listarPacientes(pagina:number,size:number){
   return this.http.get<Pacientes[]>(this.URL_BACKEND+`api/pacientes/consultar/${(pagina?pagina:1)-1},${size}`);
  }
  listarCitas(pagina:number,size:number){
    return this.http.get<Citas[]>(this.URL_BACKEND+ `api/citas/consultar/${(pagina?pagina:1)-1},${size}`);

  }
  filtrarId(id:any){
    return this.http.get<Citas[]>(this.URL_BACKEND+`api/citas/listarid?id=${id}&pagina=0&size=8`);
  }

  guardarServicios(servicios:Servicios) : Observable<Object>{
    return this.http.post(this.URL_BACKEND+'api/servicios/create',servicios).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire('error',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }
  guardarCita(cita:Citas){
  
    return this.http.post(this.URL_BACKEND+'api/citas/guardar',cita).pipe(
      catchError(e=>{
        console.error(e.mensaje.error)
        Swal.fire('error',e.error.mensaje,'error')
        return throwError(e);

      })
    )
    
  }
  listserviciosp(){
return this.http.get<Servicios[]>(this.URL_BACKEND+'api/servicios/consultasp')

  }
  guardarPacientes(pacientes:Pacientes){
    return this.http.post(this.URL_BACKEND+'api/pacientes/guardar',pacientes).pipe(
      catchError(e=>{
        console.error(e.error.mensaje)
        Swal.fire('error',e.error.mensaje,'error')
        return throwError(e)
      })
    )
  }

 

  buscarIdPaciente(id:number) : Observable<Pacientes>{
    return this.http.get<Pacientes>(this.URL_BACKEND+ `api/pacientes/consultarid/${id}`).pipe(
      catchError(e =>{
       console.error(e.error.mensaje);
      Swal.fire('error',e.error.mensaje,'error');
        return throwError(e);

      })
    )
  }

  actualizarServicio(eid:number,servicios:Servicios): Observable<Object>{
    return this.http.put(this.URL_BACKEND+ `servicios/update/${servicios.eid}`,servicios)
  }

  buscarNombre(nombre:String) : Observable<Servicios>{
    return this.http.get<Servicios>(this.URL_BACKEND+ `api/servicios/listarnombre?nombre=${nombre}`);
  }

  buscarid(eid:number) : Observable<Servicios>{
    return this.http.get<Servicios>(this.URL_BACKEND+ `api/servicios/listareid/${eid}`).pipe(
      catchError(e =>{
       console.error(e.error.mensaje);
      Swal.fire('error',e.error.mensaje,'error');
        return throwError(e);

      })
    )
  }

  eliminarServicio(eid:number){
    return this.http.delete(this.URL_BACKEND+ `api/servicios/delete/${eid}`);
  }



}
