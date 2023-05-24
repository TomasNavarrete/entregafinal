import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Curso, CursosResponse } from './cursos.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environmentAPI } from 'src/environments/environment';
@Injectable()
export class CursoService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environmentAPI.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Curso[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCursos(idEstudiante){
      if(idEstudiante==0){
        this.subs.sink = this.httpClient.get<CursosResponse>(this.API_URL+ "/cursos").subscribe(
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
        this.subs.sink = this.httpClient.get<CursosResponse>(this.API_URL+ "/registrar_cursos_estudiante/"+idEstudiante).subscribe(
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

  getAllCursosExcel(idEstudiante){
      if(idEstudiante==0){
        return this.httpClient.get<CursosResponse>(this.API_URL+ "/cursos")
      }else{
        return this.httpClient.get<CursosResponse>(this.API_URL+ "/registrar_cursos_estudiante/"+idEstudiante)
      }
  }
  addCurso(curso: Curso){
    this.dialogData = curso;
    delete curso.id;
    return this.httpClient.post(this.API_URL+ "/cursos", curso);
  }
  updateCurso(curso: Curso){
    var cursoLimp=this.convertirValoresAString(curso);
    
    return this.httpClient.put(this.API_URL + "/cursos", cursoLimp,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
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
  
  deleteCurso(id: number){

     return this.httpClient.delete(this.API_URL+ "/cursos/" + id);
  }
}
