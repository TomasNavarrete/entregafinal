import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      usuario: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      this.authService.olvidoclave(this.authForm.getRawValue()).subscribe(data=>{
        this.showNotification(
          'snackbar-success',
          'Revisa Tu Correo Para Culminar Proceso...!!!',
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
