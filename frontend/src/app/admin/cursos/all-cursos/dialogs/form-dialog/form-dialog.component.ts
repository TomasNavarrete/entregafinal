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
    if (this.action === 'edit') {
      this.dialogTitle = data.curso.nombre;
      this.curso = data.curso;
    } else {
      this.dialogTitle = 'Nuevo Curso';
      this.curso = new Curso({});
    }
    this.cursoForm = this.createContactForm();
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
      id: [this.curso.id || 0] ,
      codigo: [this.curso.codigo, [Validators.required]],
      nombre: [this.curso.nombre, [Validators.required]],
      creditos: [this.curso.creditos, [Validators.required]],
      descripcion: [this.curso.descripcion, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.cursoService.addCurso(this.cursoForm.getRawValue()).subscribe(data=>{
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
    this.cursoService.updateCurso(this.cursoForm.getRawValue()).subscribe(data=>{
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
