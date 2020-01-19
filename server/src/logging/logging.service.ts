import { Injectable, Logger, Inject, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggingService extends Logger {
    constructor(@Inject('winston') private readonly logger: winston.Logger) {
        super();

        this.logger.level = process.env.ENV === 'development' ? 'debug' : 'info';
    }

    error(message: string, context?: string): void {
        this.logger.error( message, { context});
    }

    warn(message: string, context?: string): void {
        this.logger.warn(message, { context });
    }

    info(message: string, context?: string): void {
        this.logger.info(message, { context });
    }

    debug(message: string, context?: string): void {
        this.logger.debug(message, { context });
    }
}
