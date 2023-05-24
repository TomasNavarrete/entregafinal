export class Curso {
  id: string;
  codigo: string;
  nombre: string;
  creditos: string;
  descripcion: string;
  apellido2: string;
  documento: string;
  constructor(curso) {
    {
      this.id = curso.id || '';
      this.codigo = curso.codigo || '';
      this.nombre = curso.nombre || '';
      this.creditos = curso.creditos || '';
      this.descripcion = curso.descripcion || '';
    }
  }
  
}

export class CursosResponse{
  Mensaje:string;
  status:boolean;
  data:any;
}
