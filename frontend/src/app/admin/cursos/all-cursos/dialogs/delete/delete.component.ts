import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CursoService } from '../../curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cursoService: CursoService,
    private snackBar: MatSnackBar
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.cursoService.deleteCurso(this.data.id).subscribe(data=>{
      this.showNotification(
        'snackbar-success',
        'Borro Correctamente...!!!',
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
