import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, UsuariosResponse } from './usuario.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environmentAPI } from 'src/environments/environment';
@Injectable()
export class UsuarioService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environmentAPI.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Usuario[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUsuarios(){
    this.subs.sink = this.httpClient.get<UsuariosResponse>(this.API_URL+ "/admin_list").subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  addUsuario(usuario: Usuario){
    this.dialogData = usuario;

    return this.httpClient.post(this.API_URL+ "/admin", usuario);
  }
  updateUsuario(usuario: Usuario){
    this.dialogData = usuario;
    
    return this.httpClient.put(this.API_URL + "/admin", usuario,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  deleteUsuario(id: number){

     return this.httpClient.delete(this.API_URL+ "/admin/" + id);
  }
}
