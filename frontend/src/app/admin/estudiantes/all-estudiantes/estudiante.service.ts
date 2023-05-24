import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estudiante, EstudiantesResponse } from './estudiantes.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environmentAPI } from 'src/environments/environment';
@Injectable()
export class EstudianteService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environmentAPI.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Estudiante[]> = new BehaviorSubject<Estudiante[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Estudiante[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEstudiantes(idCurso){
      if(idCurso==0){
        this.subs.sink = this.httpClient.get<EstudiantesResponse>(this.API_URL+ "/estudiantes_list").subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.data);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          }
        );
      }else{
        this.subs.sink = this.httpClient.get<EstudiantesResponse>(this.API_URL+ "/registrar_cursos/"+idCurso).subscribe(
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
    
  }

  getAllEstudiantesExcel(idCurso){
      if(idCurso==0){
        return this.httpClient.get<EstudiantesResponse>(this.API_URL+ "/estudiantes_list")
      }else{
        return this.httpClient.get<EstudiantesResponse>(this.API_URL+ "/registrar_cursos/"+idCurso)
      }
  }
  addEstudiante(estudiante: Estudiante){
    this.dialogData = estudiante;
    delete estudiante.id;
    return this.httpClient.post(this.API_URL+ "/estudiantes", estudiante);
  }
  updateEstudiante(estudiante: Estudiante){
    var estudianteLimp=this.convertirValoresAString(estudiante);
    return this.httpClient.put(this.API_URL + "/estudiantes", estudianteLimp,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  deleteEstudiante(id: number){

     return this.httpClient.delete(this.API_URL+ "/estudiantes/" + id);
  }

  convertirValoresAString(obj: any) {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = String(obj[key]);
      }
    }
    return result;
  }
}
