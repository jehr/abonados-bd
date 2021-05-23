import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewEstadioComponent } from './modal-view-estadio.component';

describe('ModalViewEstadioComponent', () => {
  let component: ModalViewEstadioComponent;
  let fixture: ComponentFixture<ModalViewEstadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewEstadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
