import { SqlConnection } from '../utils/sql.connection';

import { DataTablesResponse } from '../models/data-tables/datatables.response';
import { DataTablesOptions } from '../models/data-tables/data-tables.options';

import { Employee } from './../models/employee/employee';
import { EmployeeForManipulation } from './../models/employee/employee-for-manipulation';

import { Repository } from './repository';
import "../utils/string.extensions";

export class EmployeeRepository extends Repository {

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

            const connection = await SqlConnection.connectionPool().connect();
            const result = await connection.query(query);
            const count = dtOptions.search.value === "" ? await this.getCount("Employees") : result.recordset.length;

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
        } catch (error) {
            console.log(error);
        }

        return new Promise((res, rej) => {});
    }

    public async add(employee: EmployeeForManipulation): Promise<void> {
        try {

            const query = this._queryBuilder
                .insert("Employees", "Active", "CompanyId", "Email", "FirstName", "LastName")
                .values(Object.values(employee).map(value => value !== null && value !== undefined ? `'${value}'` : "NULL"))
                .build();

            const connection = await SqlConnection.connectionPool().connect();
            await connection.query(query);
            connection.close();

        } catch (error) {
            console.log(error);
        }        
    }

    public async edit(id: string, employee: EmployeeForManipulation): Promise<void> {
        try {            
            const query = this._queryBuilder
                .update("Employees", Object.entries(employee))
                .where("Id", id, true)
                .build();

                const connection = await SqlConnection.connectionPool().connect();
                await connection.query(query);
                connection.close();
                
        } catch (error) {
            console.log(error);
        }
    }

    public async employeeExists(id: string): Promise<boolean> {
        return await super.getById<Employee>(id, "Employees") !== null;
    }

    public async delete(id: string): Promise<void> {
        await super.deleteById(id, "Employees");
    }
}