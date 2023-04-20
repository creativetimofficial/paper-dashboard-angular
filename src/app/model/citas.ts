import { Estados } from "./estados";
import { Pacientes } from "./pacientes";
import { Servicios } from "./servicios";

export class Citas  {

  id:number;
  fecha:Date;
  paciente:Pacientes;
  servicios:Servicios[];
  servi:Servicios;
  estado:Estados;
  


}
