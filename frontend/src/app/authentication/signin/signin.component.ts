import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username').setValue('admin@school.org');
    this.authForm.get('password').setValue('admin@123');
  }
  teacherSet() {
    this.authForm.get('username').setValue('teacher@school.org');
    this.authForm.get('password').setValue('teacher@123');
  }
  studentSet() {
    this.authForm.get('username').setValue('student@school.org');
    this.authForm.get('password').setValue('student@123');
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              setTimeout(() => {
                var token = res;
                const decodedToken = jwt_decode(token["access_token"]);
                var perfil = decodedToken["sub"]["data"]["admin"] == '1' ? 'admin' : 'estudiante';
                const role = perfil;
                if (role === 'admin') {
                  this.router.navigate(['/admin/dashboard/main']);
                }  else if (role === "estudiante") {
                  this.router.navigate(['/estudiante/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Login no valido';
            }
          },
          (error) => {
            this.error = 'Login no valido';
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
