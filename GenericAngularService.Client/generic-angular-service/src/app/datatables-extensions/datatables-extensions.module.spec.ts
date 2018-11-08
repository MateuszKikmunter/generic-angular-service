import { DataTablesExtensionsModule } from './datatables-extensions.module';

describe('DatatablesExtensionsModule', () => {
  let datatablesExtensionsModule: DataTablesExtensionsModule;

  beforeEach(() => {
    datatablesExtensionsModule = new DataTablesExtensionsModule();
  });

  it('should create an instance', () => {
    expect(datatablesExtensionsModule).toBeTruthy();
  });
});
