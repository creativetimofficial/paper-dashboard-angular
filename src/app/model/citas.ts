import { Pacientes } from "./pacientes";
import { Servicios } from "./servicios";

export class Citas  {

  id_cita:number;
  estado:String;
  fecha:Date;
  paciente:Pacientes;
  servicios:Servicios[];
  servi:Servicios;
  


}
