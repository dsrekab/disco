import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { LoggingService } from '../logging/logging.service';
import { Stock } from '../shared/stock';
import { BaseCrudController } from '../base-abstracts/base-crud/base-crud.controller';

@Controller('stock')
export class StockController extends BaseCrudController<StockService, Stock>  {

    constructor( private logger: LoggingService, private stockService: StockService ) {
        super(logger, stockService);
     }

    GetConcreteControllerName() {
        return 'StockController';
     }

    @Get('upc/:upc')
    async getStockByUpc(@Param('upc') upc: string ) {
        this.logger.debug(`Received call to StockController.getStockByUpc(${upc})`, StockController.name);

        return this.stockService.GetStockByUpc(upc);
    }
}
