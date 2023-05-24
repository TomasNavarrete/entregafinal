import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CursoService } from './curso.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso } from './cursos.model';
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
  selector: 'app-all-cursos',
  templateUrl: './all-cursos.component.html',
  styleUrls: ['./all-cursos.component.scss'],
})
export class AllCursosComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'id',
    'codigo',
    'nombre',
    'creditos',
    'descripcion',
    'actions',
  ];
  exampleDatabase: CursoService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Curso>(true, []);
  id: number;
  curso: Curso | null;
  idEstudiante = 0;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public cursoService: CursoService,
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
    if (this.rutaActiva.snapshot.params.idEstudiante) {
      this.idEstudiante = this.rutaActiva.snapshot.params.idEstudiante;
    }
    this.loadData(this.idEstudiante);
  }
  refresh() {
    if (this.rutaActiva.snapshot.params.idEstudiante) {
      this.idEstudiante = this.rutaActiva.snapshot.params.idEstudiante;
    }
    this.loadData(this.idEstudiante);
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
        curso: this.curso,
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
    var cursoEditar = {
      id: row[0],
      codigo: row[1],
      nombre: row[2],
      creditos: row[3],
      descripcion: row[4],
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        curso: cursoEditar,
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
    var cursoEditar = {
      id: row[0],
      codigo: row[1],
      nombre: row[2],
      creditos: row[3],
      descripcion: row[4],
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: cursoEditar,
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
    var cursoEditar = {
      id: row[0],
      codigo: row[1],
      nombre: row[2],
      creditos: row[3],
      descripcion: row[4],
    }
    const dialogRef = this.dialog.open(FormDialogComponentDetalle, {
      data: {
        curso: cursoEditar
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {


    });
  }

  IrCursoEstudaintes(row) {
    this.router.navigate(['/admin/estudiantes/todos-estudiantes/' + row[0]]);
  }


  exportarExcelCursos() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cursos');
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Codigo', key: 'codigo', width: 32 },
      { header: 'Nombre', key: 'nombre', width: 32 },
      { header: 'Creditos', key: 'creditos', width: 32 },
      { header: 'Descripcion', key: 'descripcion', width: 32 },
    ];
    this.cursoService.getAllCursosExcel(this.idEstudiante).subscribe(dataEstu => {
      var data = dataEstu.data;
      data.forEach(e => {
        worksheet.addRow({ id: e["0"],codigo: e["1"], nombre: e["2"], creditos: e["3"], descripcion: e["4"], }, "n");
      });
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'CursosDatos.xlsx');
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
      this.selection = new SelectionModel<Curso>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData(idEstudiante) {
    this.exampleDatabase = new CursoService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      idEstudiante
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
export class ExampleDataSource extends DataSource<Curso> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Curso[] = [];
  renderedData: Curso[] = [];
  constructor(
    public exampleDatabase: CursoService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public idEstudiante: any
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Curso[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCursos(this.idEstudiante);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((curso: any) => {
            const searchStr = (
              curso["2"] +
              curso["4"]
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
  sortData(data: Curso[]): Curso[] {
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
        case 'codigo':
          [propertyA, propertyB] = [a[1], b[1]];
          break;
        case 'nombre':
          [propertyA, propertyB] = [a[2], b[2]];
          break;
        case 'creditos':
          [propertyA, propertyB] = [a[3], b[3]];
          break;
        case 'descripcion':
          [propertyA, propertyB] = [a[4], b[4]];
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
