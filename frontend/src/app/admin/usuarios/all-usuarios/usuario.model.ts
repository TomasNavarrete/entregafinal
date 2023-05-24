export class Usuario {
  id: number;
  nombre: string;
  correo: string;
  clave: string;
  constructor(usuario) {
    {
      this.id = usuario.id || '';
      this.nombre = usuario.nombre || '';
      this.correo = usuario.correo || '';
      this.clave = usuario.clave || '';
    }
  }
  
}

export class UsuariosResponse{
  Mensaje:string;
  status:boolean;
  data:any;
}
