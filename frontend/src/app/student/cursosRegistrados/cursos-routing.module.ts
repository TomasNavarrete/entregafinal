import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCursosComponent } from './all-cursos/all-cursos.component';

const routes: Routes = [
  {
    path: 'todos-cursos',
    component: AllCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule {}
