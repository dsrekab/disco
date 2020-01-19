import { Injectable } from '@nestjs/common';

@Injectable()
export class MssqlService {
    GetCxn() {
        return require('knex')({
            client: 'mssql',
            connection: {
                host: process.env.MSSQL_HOST,
                user: process.env.MSSQL_USERNAME,
                password: process.env.MSSQL_PASSWORD,
                database: process.env.MSSQL_DATABASE,
                options: {
                    port: process.env.MSSQL_PORT,
                },
            },
        });
    }
}
