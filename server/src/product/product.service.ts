import { Injectable } from '@nestjs/common';
import { Product } from '../shared/product';
import { BaseCrudService } from '../base-abstracts/base-crud/base-crud.service';

@Injectable()
export class ProductService extends BaseCrudService<Product> {

    GetConcreteClassName() {
        return 'ProductService';
    }

    GetSelectAllQuery(cxn) {
        return cxn.select('Id', 'Name', 'CurrentPrice')
        .from('Products');
    }

    GetSelectByIdQuery(cxn, id: number) {
        return cxn.select('Id', 'Name', 'CurrentPrice')
        .from('Products')
        .where('Id', id);
    }

    GetUpdateQuery(cxn, id: number, UpdatedDto: Product) {
        return cxn('Products')
        .where('Id', id)
        .update({Name: UpdatedDto.name,
            CurrentPrice: UpdatedDto.price});
    }

    GetCreateQuery(cxn, CreateDto: Product) {
        return cxn('Products')
        .insert({Name: CreateDto.name,
                CurrentPrice: CreateDto.price});
    }

    GetDeleteQuery(cxn, id: number) {
        return cxn('Products')
        .where('Id', id)
        .del();
    }

}
