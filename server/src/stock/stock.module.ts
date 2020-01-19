import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { LoggingService } from '../logging/logging.service';
import { MssqlService } from '../database/mssql/mssql.service';

@Module({
    providers: [LoggingService, MssqlService, StockService],
    controllers: [StockController],
})
export class StockModule {}
