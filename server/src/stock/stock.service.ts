import { Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/mssql/mssql.service';
import { LoggingService } from '../logging/logging.service';
import { Stock } from '../shared/stock';
import { BaseCrudService } from '../base-abstracts/base-crud/base-crud.service';

@Injectable()
export class StockService extends BaseCrudService<Stock> {

    constructor(private logger: LoggingService, private mssqlService: MssqlService) {
        super(logger, mssqlService);
    }

    GetConcreteClassName() {
        return 'StockService';
    }

    GetCreateQuery(cxn, CreateDto: Stock) {
        return cxn('Stock')
        .insert({Name: CreateDto.name,
                Brand: CreateDto.brand,
                UPC: CreateDto.upc,
            });
    }
    
    GetSelectAllQuery(cxn) {
        return cxn.select('Id', 'Name', 'Brand', 'UPC')
        .from('Stock');
    }

    GetSelectByIdQuery(cxn, id: number) {
        return cxn.select('Id', 'Name', 'Brand', 'UPC')
        .from('Stock')
        .where('Id', id);
    }
    
    async GetStockByUpc(upc: string) {
        this.logger.debug(`Received call to StockService.GetStockByUpc(${upc})`, StockService.name);
        const cxn = this.mssqlService.GetCxn();

        const query = cxn.select('id', 'name', 'brand', 'upc')
        .from('Stock')
        .where('UPC', upc);

        return await query.then(result => result)
        .catch(error => {this.logger.error(`Error in StockService.GetStockByUpc(${upc}) - ${error}`, StockService.name); })
        .finally(_ => cxn.destroy());
    }

    GetUpdateQuery(cxn, id: number, UpdatedDto: Stock) {
        return cxn('Stock')
        .where('Id', id)
        .update({Name: UpdatedDto.name,
            Brand: UpdatedDto.brand,
            UPC: UpdatedDto.upc,
        });
    }

    GetDeleteQuery(cxn, id: number) {
        return cxn('Stock')
        .where('Id', id)
        .del();
    }
}
