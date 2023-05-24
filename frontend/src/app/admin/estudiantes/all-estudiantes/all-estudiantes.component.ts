import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EstudianteService } from './estudiante.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Estudiante } from './estudiantes.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { FormDialogComponent as FormDialogComponentDetalle } from './dialogs/form-dialog-detalle/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from './../../../shared/UnsubscribeOnDestroyAdapter';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-all-estudiantes',
  templateUrl: './all-estudiantes.component.html',
  styleUrls: ['./all-estudiantes.component.scss'],
})
export class AllEstudiantesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'id',
    'nombre',
    'apellido1',
    'apellido2',
    'email',
    'documento',
    'actions',
  ];
  exampleDatabase: EstudianteService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Estudiante>(true, []);
  id: number;
  estudiante: Estudiante | null;
  idCurso = 0;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public estudianteService: EstudianteService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    if (this.rutaActiva.snapshot.params.idCurso) {
      this.idCurso = this.rutaActiva.snapshot.params.idCurso;
      this.displayedColumns = [
        'idEst',
        'nombreEst',
        'apellido1Est',
        'apellido2Est',
        'documentoEst',
        'actions'
      ];
    }
    this.loadData(this.idCurso);
  }
  refresh() {
    if (this.rutaActiva.snapshot.params.idCurso) {
      this.idCurso = this.rutaActiva.snapshot.params.idCurso;
    }
    this.loadData(this.idCurso);
  }
  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        estudiante: this.estudiante,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }

    });
  }
  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    var estudianteEditar = {
      id: row[0],
      nombre: row[2],
      apellido1: row[3],
      apellido2: row[4],
      documento: row[1],
      correo: row[5]
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        estudiante: estudianteEditar,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }

    });
  }
  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    var estudianteEditar = {
      id: row[0],
      nombre: row[2],
      apellido1: row[3],
      apellido2: row[4],
      documento: row[1],
      correo: row[5]
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: estudianteEditar,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }

    });
  }

  detalleCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    var estudianteEditar = {
      id: row[0],
      nombre: row[2],
      apellido1: row[3],
      apellido2: row[4],
      documento: row[1],
      correo: row[5]
    }
    if(this.idCurso!=0){
      estudianteEditar = {
        id: row[1],
        nombre: row[4],
        apellido1: row[6],
        apellido2: row[7],
        documento: row[5],
        correo: ""
      }
    }
    const dialogRef = this.dialog.open(FormDialogComponentDetalle, {
      data: {
        estudiante: estudianteEditar
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {


    });
  }

  IrCursoEstudaintes(row) {
    this.router.navigate(['/admin/cursos/todos-cursos/' + row[0]]);
  }


  exportarExcelEstudiantes() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Estudiantes');
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 32 },
      { header: 'Apellido 1', key: 'apellido1', width: 32 },
      { header: 'Apellido 2', key: 'apellido2', width: 32 },
      { header: 'Correo Electronico', key: 'email', width: 32 },
      { header: 'Documento', key: 'documento', width: 32 },
    ];
    this.estudianteService.getAllEstudiantesExcel(this.idCurso).subscribe(dataEstu => {
      var data = dataEstu.data;
      if(this.idCurso!=0){
        data.forEach(e => {
          worksheet.addRow({ id: e["1"], nombre: e["4"],apellido1: e["6"],apellido2: e["7"],email: "",documento: e["5"], }, "n");
        });
      }else{
        data.forEach(e => {
          worksheet.addRow({ id: e["0"], nombre: e["2"],apellido1: e["3"],apellido2: e["4"],email: e["5"],documento: e["1"], }, "n");
        });
      }
      
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'EstudiantesDatos.xlsx');
      });
    })

  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Estudiante>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData(idCurso) {
    this.exampleDatabase = new EstudianteService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      idCurso
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
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
export class ExampleDataSource extends DataSource<Estudiante> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Estudiante[] = [];
  renderedData: Estudiante[] = [];
  constructor(
    public exampleDatabase: EstudianteService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public idCurso: any
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Estudiante[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllEstudiantes(this.idCurso);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((estudiante: any) => {
            const searchStr = (
              estudiante["2"] +
              estudiante["3"] +
              estudiante["4"] +
              estudiante["5"] +
              estudiante["1"]
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Estudiante[]): Estudiante[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a[0], b[0]];
          break;
        case 'nombre':
          [propertyA, propertyB] = [a[2], b[2]];
          break;
        case 'apellido1':
          [propertyA, propertyB] = [a[3], b[3]];
          break;
        case 'apellido2':
          [propertyA, propertyB] = [a[4], b[4]];
          break;
        case 'email':
          [propertyA, propertyB] = [a[5], b[5]];
          break;
        case 'documento':
          [propertyA, propertyB] = [a[1], b[1]];
          break;
        // case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
