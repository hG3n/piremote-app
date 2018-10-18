import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularDialogComponent } from './modular-dialog.component';

describe('ModularDialogComponent', () => {
  let component: ModularDialogComponent;
  let fixture: ComponentFixture<ModularDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModularDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
