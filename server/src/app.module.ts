import { Module } from '@nestjs/common';
import * as moment from 'moment';

import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import * as winston from 'winston';

import { StockModule } from './stock/stock.module';
import { LoggingService } from './logging/logging.service';
import { ProductModule } from './product/product.module';
import { BaseCrudController } from './base-abstracts/base-crud/base-crud.controller';

const dailyErrorTransport = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYYMMDD',
    filename: 'logs/%DATE%_error.log',
    zippedArchive: true,
    utc: true,
});

const dailyCombinedTransport = new winston.transports.DailyRotateFile({
    datePattern: 'YYYYMMDD',
    filename: `logs/%DATE%_combined.log`,
    zippedArchive: true,
    utc: true,
});

const currentUTC = () => {
    return moment().utc().format('YYYY-MM-DD HH:mm:ssZ');
};

@Module({
    imports: [ WinstonModule.forRoot({
        format: winston.format.combine(
            winston.format.timestamp({
                format: currentUTC() }),
            winston.format.printf(({level, message, context, timestamp}) => `${timestamp} [${level}] ${context}: ${message}`),
        ),
        transports: [ dailyCombinedTransport, dailyErrorTransport],
    }),
        StockModule,
        ProductModule ],
    controllers: [],
    providers: [LoggingService],
})
export class AppModule {}
