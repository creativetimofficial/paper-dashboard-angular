import { Usuarios } from "./usuarios";

export class Pacientes {
  usuarios:Usuarios = new Usuarios;
  id: number;
  cedula: String;
  nombre: String;
  apellidos: String;
  direccion: String;
  telefono: String;
  entidad: String;
  paciente:Pacientes;
  }
