import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { AllEstudiantesComponent } from './all-estudiantes/all-estudiantes.component';
import { DeleteDialogComponent } from './all-estudiantes/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-estudiantes/dialogs/form-dialog/form-dialog.component';
import { FormDialogComponent as  FormDialogComponentDetalle} from './all-estudiantes/dialogs/form-dialog-detalle/form-dialog.component';
import { EstudianteService } from './all-estudiantes/estudiante.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AllEstudiantesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    FormDialogComponentDetalle
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    EstudiantesRoutingModule,
    MatProgressSpinnerModule,
  ],
  providers: [EstudianteService],
})
export class EstudiantesModule {}
