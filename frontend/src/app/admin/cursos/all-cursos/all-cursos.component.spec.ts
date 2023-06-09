import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCursosComponent } from './all-cursos.component';

describe('AllCursosComponent', () => {
  let component: AllCursosComponent;
  let fixture: ComponentFixture<AllCursosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
