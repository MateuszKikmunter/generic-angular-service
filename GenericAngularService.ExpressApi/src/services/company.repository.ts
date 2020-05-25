import { SqlConnection } from '../utils/sql/sql.connection';

import { DataTablesResponse } from '../models/data-tables/datatables.response';
import { DataTablesOptions } from '../models/data-tables/data-tables.options';

import { Company } from '../models/company/company';
import { CompanyForManipulation } from './../models/company/company-for-manipulation';
import { Repository } from './repository';

export class CompanyRepository extends Repository {

    constructor() {
        super();
    }

    public async getAll(): Promise<Company[]> {
        try {

            const query: string = this._queryBuilder
            .select("*")
            .from("Companies")
            .build();

            const connection = await SqlConnection.connectionPool().connect();
            const result = await connection.query(query);
            connection.close();

            const companies: Company[] = result.recordset.map(row => {
                return {
                    id: row.Id,
                    name: row.Name,
                    industry: row.Industry,
                    founded: row.Founded
                };
            });

            return new Promise((res, rej) => res(companies));

        } catch (error) {
            console.log(error); 
        }

        return new Promise((res, rej) => {});
    }

    public async getDataTablesData(dtOptions: DataTablesOptions): Promise<DataTablesResponse<Company>> {
        try {

            const query: string = this._queryBuilder
                .select("*")
                .from("Companies")
                .where("Name", dtOptions.search.value)
                .orderBy(dtOptions.columns[dtOptions.order[0].column].data, dtOptions.order[0].dir)
                .skip(dtOptions.start)
                .take(dtOptions.length)
                .build();

            const connection = await SqlConnection.connectionPool().connect();
            const result = await connection.query(query);
            const count = dtOptions.search.value === "" ? await this.getCount("Companies") : result.recordset.length;

            connection.close();

            const dtResult: DataTablesResponse<Company> = {
                data: result.recordset.map(row => {
                    return {
                        id: row.Id,
                        name: row.Name,
                        industry: row.Industry,
                        founded: row.Founded
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

    
    public async edit(id: string, company: CompanyForManipulation): Promise<void> {
        try {            
            await super.update("Companies", id, company);
        } catch (error) {
            console.log(error);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await super.deleteById(id, "Companies");
        } catch (error) {
            console.log(error);
        }
    }

    public async companyExists(id: string): Promise<boolean> {
        return await super.getById<Company>(id, "Companies") !== null;
    }
}