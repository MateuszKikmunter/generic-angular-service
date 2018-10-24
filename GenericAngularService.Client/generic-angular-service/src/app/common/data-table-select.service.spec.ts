import { TestBed } from '@angular/core/testing';

import { DataTableSelect } from './data-table-select.service';

describe('DataTableSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTableSelect = TestBed.get(DataTableSelect);
    expect(service).toBeTruthy();
  });
});
