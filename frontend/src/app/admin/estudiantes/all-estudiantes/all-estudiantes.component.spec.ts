import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllEstudiantesComponent } from './all-estudiantes.component';

describe('AllEstudiantesComponent', () => {
  let component: AllEstudiantesComponent;
  let fixture: ComponentFixture<AllEstudiantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
