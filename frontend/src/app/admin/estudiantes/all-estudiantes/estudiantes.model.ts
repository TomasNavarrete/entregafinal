export class Estudiante {
  id: number;
  nombre: string;
  correo: string;
  clave: string;
  apellido1: string;
  apellido2: string;
  documento: string;
  constructor(estudiante) {
    {
      this.id = estudiante.id || '';
      this.nombre = estudiante.nombre || '';
      this.correo = estudiante.correo || '';
      this.clave = estudiante.clave || '';
      this.apellido1 = estudiante.apellido1 || '';
      this.apellido2 = estudiante.apellido2 || '';
      this.documento = estudiante.documento || '';
    }
  }
  
}

export class EstudiantesResponse{
  Mensaje:string;
  status:boolean;
  data:any;
}
