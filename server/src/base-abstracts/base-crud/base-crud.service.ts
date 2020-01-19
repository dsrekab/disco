import { Injectable, Get } from '@nestjs/common';
import { LoggingService } from '../../logging/logging.service';
import { MssqlService } from '../../database/mssql/mssql.service';
import { Entity } from '../../shared/entity';

@Injectable()
export abstract class BaseCrudService<T extends Entity> {
    constructor(private baseLogger: LoggingService, private baseMssqlService: MssqlService) {}

    private concreteClass;
    abstract GetConcreteClassName();

    abstract GetSelectAllQuery(cxn);
    abstract GetSelectByIdQuery(cxn, id: number);
    abstract GetUpdateQuery(cxn, id: number, UpdatedDto: T);
    abstract GetCreateQuery(cxn, CreateDto: T);
    abstract GetDeleteQuery(cxn, id: number);

    // Create
    async CreateRecord(newDto: T) {
        this.concreteClass = this.GetConcreteClassName();
        this.baseLogger.debug(`Received call to  ${this.concreteClass}.CreateRecord()`, this.concreteClass);

        const cxn = this.baseMssqlService.GetCxn();

        const query = this.GetCreateQuery(cxn, newDto);

        return await query.then(result => result)
        .catch(error => {this.baseLogger.error(`Error in  ${this.concreteClass}.CreateRecord() - ${error}`, this.concreteClass); })
        .finally(_ => cxn.destroy());
    }

    // Read
    async ReadAll() {
        this.concreteClass = this.GetConcreteClassName();
        this.baseLogger.debug(`Received call to ${this.concreteClass}.ReadAll()`, this.concreteClass);

        const cxn = this.baseMssqlService.GetCxn();

        const query = this.GetSelectAllQuery(cxn);

        return await query.then(result => result)
        .catch(error => {this.baseLogger.error(`Error in  ${this.concreteClass}.ReadAll() - ${error}`, this.concreteClass); })
        .finally(_ => cxn.destroy());
    }

    async ReadById(id: number) {
        this.concreteClass = this.GetConcreteClassName();
        this.baseLogger.debug(`Received call to  ${this.concreteClass}.ReadById(${id})`, this.concreteClass);

        const cxn = this.baseMssqlService.GetCxn();

        const query = this.GetSelectByIdQuery(cxn, id);

        return await query.then(result => result)
        .catch(error => {this.baseLogger.error(`Error in  ${this.concreteClass}.ReadById(${id}) - ${error}`, this.concreteClass); })
        .finally(_ => cxn.destroy());
    }

    // Update
    async UpdateRecord(id: number, updateDto: T) {
        this.concreteClass = this.GetConcreteClassName();
        this.baseLogger.debug(`Received call to ${this.concreteClass}.UpdateRecord(${id})`, this.concreteClass);

        const cxn = this.baseMssqlService.GetCxn();

        const query = this.GetUpdateQuery(cxn, id, updateDto);

        return await query.then(result => result)
        .catch(error => {this.baseLogger.error(`Error in ${this.concreteClass}.UpdateRecord(${id}) - ${error}`, this.concreteClass); })
        .finally(_ => cxn.destroy());
    }

    // Delete
    async DeleteRecord(id: number) {
        this.concreteClass = this.GetConcreteClassName();
        this.baseLogger.debug(`Received call to  ${this.concreteClass}.DeleteRecord(${id})`, this.concreteClass);

        const cxn = this.baseMssqlService.GetCxn();

        const query = this.GetDeleteQuery(cxn, id);

        return await query.then(result => result)
        .catch(error => {this.baseLogger.error(`Error in  ${this.concreteClass}.DeleteRecord(${id}) - ${error}`, this.concreteClass); })
        .finally(_ => cxn.destroy());
    }
}
