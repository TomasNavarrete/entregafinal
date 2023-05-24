import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEstudiantesComponent } from './all-estudiantes/all-estudiantes.component';

const routes: Routes = [
  {
    path: 'todos-estudiantes',
    component: AllEstudiantesComponent
  },
  {
    path: 'todos-estudiantes/:idCurso',
    component: AllEstudiantesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule {}
