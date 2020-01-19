import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { LoggingService } from 'src/logging/logging.service';
import { MssqlService } from 'src/database/mssql/mssql.service';

@Module({
    providers: [LoggingService, MssqlService, ProductService],
    controllers: [ProductController],
})
export class ProductModule {}
