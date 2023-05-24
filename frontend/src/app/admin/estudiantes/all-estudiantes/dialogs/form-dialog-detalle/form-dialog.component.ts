import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EstudianteService } from '../../estudiante.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Estudiante } from '../../estudiantes.model';
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
  estudianteForm: FormGroup;
  estudiante: Estudiante;
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public estudianteService: EstudianteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.estudiante = data.estudiante;
    this.dialogTitle = 'Detalle Estudiante';
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
