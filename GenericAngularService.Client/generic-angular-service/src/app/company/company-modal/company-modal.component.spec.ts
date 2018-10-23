import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyModalComponent } from './company-modal.component';

describe('CompanyModalComponent', () => {
  let component: CompanyModalComponent;
  let fixture: ComponentFixture<CompanyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
