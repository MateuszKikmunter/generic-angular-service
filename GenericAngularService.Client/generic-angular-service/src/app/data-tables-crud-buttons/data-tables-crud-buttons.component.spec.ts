import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesCrudButtonsComponent } from './data-tables-crud-buttons.component';

describe('DataTablesCrudButtonsComponent', () => {
  let component: DataTablesCrudButtonsComponent;
  let fixture: ComponentFixture<DataTablesCrudButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablesCrudButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablesCrudButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
