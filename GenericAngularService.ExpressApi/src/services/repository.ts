import { ConnectionPool } from 'mssql';

import { SqlConfiguration } from '../utils/sql.configuration';
import { DataTablesResponse } from './../models/data-tables/datatables.response';
import { DataTablesOptions } from './../models/data-tables/data-tables.options';

//TODO: make this abstract and generic
export class Repository {

    public async getAll(dtOptions: DataTablesOptions): Promise<DataTablesResponse> {
        try {
            const orderBy = dtOptions.columns[dtOptions.order[0].column].data;
            const sortDirection = dtOptions.order[0].dir;
            const pool = await new ConnectionPool(SqlConfiguration.defaultConfig());
            const connection = await pool.connect();
            const result = await connection.query(`
                SELECT * FROM companies WHERE name LIKE '%${ dtOptions.search.value }%'
                ORDER BY ${ orderBy } ${ sortDirection }
                OFFSET ${ dtOptions.start } ROWS 
                FETCH NEXT ${ dtOptions.length } ROWS ONLY;`
            );

            const dtResult: DataTablesResponse = {
                data: result.recordset.map(r => {
                    return {
                    id: r.Id,
                    name: r.Name,
                    industry: r.Industry,
                    founded: r.Founded
                    }
                }),
                draw: dtOptions.draw,
                recordsFiltered: result.recordset.length,
                recordsTotal: result.recordset.length
            }

            return new Promise((res, rej) => res(dtResult));
        } catch (err) {
            console.log(err);
        }

        return new Promise((res, rej) => {});
    }
}