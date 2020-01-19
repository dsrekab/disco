import { Controller, Get, ParseIntPipe, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { LoggingService } from '../../logging/logging.service';
import { BaseCrudService } from './base-crud.service';
import { Entity } from '../../shared/entity';

@Controller('base-crud')
export abstract class BaseCrudController<T extends BaseCrudService<TEntity>, TEntity extends Entity> {
    private concreteController;
    abstract GetConcreteControllerName();

    constructor(private baseLogger: LoggingService, private crudService: T) {}

    // Create
    @Post()
    async createRecord(@Body() newDto: TEntity) {
        this.concreteController = this.GetConcreteControllerName();
        this.baseLogger.debug(`Received call to ${this.concreteController}.createRecord()`, this.concreteController);

        return await this.crudService.CreateRecord(newDto);
    }

    // Read
    @Get()
    async readAll() {
        this.concreteController = this.GetConcreteControllerName();
        this.baseLogger.debug(`Received call to ${this.concreteController}.readAll()`, this.concreteController);

        return await this.crudService.ReadAll();
    }

    @Get('id/:id')
    async readById(@Param('id', new ParseIntPipe()) id: number ) {
        this.concreteController = this.GetConcreteControllerName();
        this.baseLogger.debug(`Received call to ${this.concreteController}.readById(${id})`, this.concreteController);

        return await this.crudService.ReadById(id);
    }

    // Update
    @Put(':id')
    async updateRecord(@Param('id', new ParseIntPipe()) id: number, @Body() updateDto: TEntity) {
        this.concreteController = this.GetConcreteControllerName();
        this.baseLogger.debug(`Received call to ${this.concreteController}.updateRecord(${id})`, this.concreteController);

        return await this.crudService.UpdateRecord(id, updateDto);
    }

    // Delete
    @Delete(':id')
    async deleteRecord(@Param('id', new ParseIntPipe()) id: number) {
        this.concreteController = this.GetConcreteControllerName();
        this.baseLogger.debug(`Received call to ${this.concreteController}.deleteRecord(${id})`, this.concreteController);

        return await this.crudService.DeleteRecord(id);
    }
}
