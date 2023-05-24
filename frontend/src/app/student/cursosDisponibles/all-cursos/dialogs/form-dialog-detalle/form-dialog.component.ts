import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CursoService } from '../../curso.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Curso } from '../../cursos.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  cursoForm: FormGroup;
  curso: Curso;
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cursoService: CursoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.curso = data.curso;
    this.dialogTitle = 'Detalle Curso';
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
