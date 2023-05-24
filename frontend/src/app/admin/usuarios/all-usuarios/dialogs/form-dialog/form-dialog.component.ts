import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UsuarioService } from '../../usuario.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Usuario } from '../../usuario.model';
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
  usuarioForm: FormGroup;
  usuario: Usuario;
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.usuario.nombre;
      this.usuario = data.usuario;
    } else {
      this.dialogTitle = 'Nuevo Usuario';
      this.usuario = new Usuario({});
    }
    this.usuarioForm = this.createContactForm();
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
      id: [this.usuario.id || 0] ,
      nombre: [this.usuario.nombre, [Validators.required]],
      correo: [this.usuario.correo, this.action !== 'edit'?[Validators.required,Validators.email]:[]],
      clave: [this.usuario.clave, this.action !== 'edit'?[Validators.required]:[]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.usuarioService.addUsuario(this.usuarioForm.getRawValue()).subscribe(data=>{
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
    this.usuarioService.updateUsuario(this.usuarioForm.getRawValue()).subscribe(data=>{
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
