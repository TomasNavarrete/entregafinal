import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllUsuariosComponent } from './all-usuarios.component';

describe('AllUsuariosComponent', () => {
  let component: AllUsuariosComponent;
  let fixture: ComponentFixture<AllUsuariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
