import { Company } from 'src/app/company/shared/company';

import { DataTableSelect } from './data-table-select.service';

describe('DataTableSelectService', () => {

  let service: DataTableSelect<any>;
  let previous, current: Company;

  beforeEach(() => {
    service = new DataTableSelect();
    previous = new Company();
    previous.id = 1;

    current = new Company();
    current.id = 2;
  });

  describe("selectRow", () => {

    it("should not select when null argument passed and selectedItem is null", () => {
      service.selectRow(null);
      expect(service.selectedItem).toBeNull();
    });

    it("should clear selection when null argument passed", () => {
      service.selectedItem = previous;
      service.selectRow(null);

      expect(service.selectedItem).toBeNull();
    });

    it("should clear selection when the same item passed", () => {
      service.selectedItem = previous;
      service.selectRow(previous);

      expect(service.selectedItem).toBeNull();
    });

    it("should select when selectedItem is null", () => {
      service.selectRow(current);
      expect(service.selectedItem).toBe(current);
    });

    it("should select when different item passed", () => {
      service.selectedItem = previous;
      service.selectRow(current);

      expect(service.selectedItem).toBe(current);
    });
  });

  describe("rowSelected", () => {

    it("should return false when no selection", () => {
      expect(service.rowSelected(null)).toBeFalsy();
      expect(service.rowSelected(new Company())).toBeFalsy();
    });

    it("should return false when different item selected", () => {
      service.selectedItem = previous;
      expect(service.rowSelected(current)).toBeFalsy();
    });

    it("should return true when the same item selected", () => {
      service.selectedItem = previous;
      expect(service.rowSelected(previous)).toBeTruthy();
    });
  });

  describe("clearRowSelection", () => {
    it("should clear seleted item", () => {
      service.selectedItem = new Company();
      service.clearRowSelection();
      expect(service.selectedItem).toBeNull();
    });
  });
});
