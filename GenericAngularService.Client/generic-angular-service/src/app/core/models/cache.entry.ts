import { HttpResponse } from '@angular/common/http';

import { DataTablesOptions } from './data-tables/data-tables.options';

export class CacheEntry {
    url: string;
    options: DataTablesOptions;
    reponse: HttpResponse<any>;
}