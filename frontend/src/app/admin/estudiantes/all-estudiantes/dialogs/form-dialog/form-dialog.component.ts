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
    if (this.action === 'edit') {
      this.dialogTitle = data.estudiante.nombre;
      this.estudiante = data.estudiante;
    } else {
      this.dialogTitle = 'Nuevo Estudiante';
      this.estudiante = new Estudiante({});
    }
    this.estudianteForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.estudiante.id || 0] ,
      nombre: [this.estudiante.nombre, [Validators.required]],
      apellido1: [this.estudiante.apellido1, [Validators.required]],
      apellido2: [this.estudiante.apellido2, [Validators.required]],
      documento: [this.estudiante.documento, [Validators.required]],
      correo: [this.estudiante.correo, this.action !== 'edit'?[Validators.required,Validators.email]:[]],
      clave: [this.estudiante.clave, this.action !== 'edit'?[Validators.required]:[]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.estudianteService.addEstudiante(this.estudianteForm.getRawValue()).subscribe(data=>{
      this.showNotification(
        'snackbar-success',
        'Agrego Correctamente...!!!',
        'bottom',
        'center'
      );
      this.dialogRef.close(1);
    },error=>{
      this.showNotification(
        'snackbar-danger',
        'Error de Solicitud!!!',
        'bottom',
        'center'
      );
    });
  }

  public confirmUpdate(): void {
    this.estudianteService.updateEstudiante(this.estudianteForm.getRawValue()).subscribe(data=>{
      this.showNotification(
        'snackbar-success',
        'Actualizo Correctamente...!!!',
        'bottom',
        'center'
      );
      this.dialogRef.close(1);
    },error=>{
      this.showNotification(
        'snackbar-danger',
        'Error de Solicitud!!!',
        'bottom',
        'center'
      );
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
