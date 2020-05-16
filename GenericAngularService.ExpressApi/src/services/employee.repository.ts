import { ConnectionPool } from 'mssql';

import { SqlConfiguration } from '../utils/sql.configuration';
import { DataTablesResponse } from '../models/data-tables/datatables.response';
import { DataTablesOptions } from '../models/data-tables/data-tables.options';
import { Employee } from './../models/employee/employee';
import { Reposiory } from './repository';

export class EmployeeRepository extends Reposiory {

    public async getAll(dtOptions: DataTablesOptions): Promise<DataTablesResponse<Employee>> {
        try {
            const query: string = this._queryBuilder
                .select("Employees.*", "Companies.Name as Company")
                .from("Employees")
                .leftJoin("Companies", "Employees.CompanyId", "Companies.Id")
                .where("FirstName", dtOptions.search.value)
                .or("LastName", dtOptions.search.value)
                .orderBy(dtOptions.columns[dtOptions.order[0].column].data, dtOptions.order[0].dir)
                .skip(dtOptions.start)
                .take(dtOptions.length)
                .build();

            const pool = await new ConnectionPool(SqlConfiguration.defaultConfig());
            const connection = await pool.connect();
            const result = await connection.query(query);
            const count = dtOptions.search.value === "" ? await this.getCount(connection, "Employees") : result.recordset.length;

            connection.close();

            const dtResult: DataTablesResponse<Employee> = {
                data: result.recordset.map(row => {
                    return {
                        id: row.Id,
                        firstName: row.FirstName,
                        lastName: row.LastName,
                        company: row.Company,
                        email: row.Email,
                        active: row.Active,
                        fullName: `${row.FirstName} ${row.LastName}`
                    }
                }),
                draw: dtOptions.draw,
                recordsFiltered: count,
                recordsTotal: count
            }

            return new Promise((res, rej) => res(dtResult));
        } catch (err) {
            console.log(err);
        }

        return new Promise((res, rej) => {});
    }
}