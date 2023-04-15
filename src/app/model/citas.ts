import { Pacientes } from "./pacientes";
import { Servicios } from "./servicios";

export class Citas  {

  id:number;
  estado:String;
  fecha:Date;
  paciente:Pacientes;
  servicios:Servicios[];
  servi:Servicios;
  


}
