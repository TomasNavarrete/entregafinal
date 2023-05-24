import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
})
export class LockedComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  userImg: string;
  userFullName: string;
  hide = true;
  token="";
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    if (this.route.snapshot.params.token) {
      this.token = this.route.snapshot.params.token;
    }
    this.authForm = this.formBuilder.group({
      clave: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.restablecer_clave_acep(this.authForm.getRawValue(),this.token).subscribe(data=>{
        this.showNotification(
          'snackbar-success',
          'Clave Cambiada Ya Puedes Iniciar Sesion...!!!',
          'bottom',
          'center'
        );
        this.router.navigate(['/authentication/signin']);
      },error=>{
        this.showNotification(
          'snackbar-danger',
          'Error de Solicitud!!!',
          'bottom',
          'center'
        );
      })

      
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
