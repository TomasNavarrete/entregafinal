import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'cursosDisponibles',
    loadChildren: () =>
      import('./cursosDisponibles/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'cursosRegistrados',
    loadChildren: () =>
      import('./cursosRegistrados/cursos.module').then((m) => m.CursosModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
