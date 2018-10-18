import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchListTileComponent } from './switch-list-tile.component';

describe('SwitchListTileComponent', () => {
  let component: SwitchListTileComponent;
  let fixture: ComponentFixture<SwitchListTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchListTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
