import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { LoggingService } from 'src/logging/logging.service';
import { Product } from 'src/shared/product';
import { BaseCrudController } from 'src/base-abstracts/base-crud/base-crud.controller';

@Controller('product')
export class ProductController extends BaseCrudController<ProductService, Product> {

     constructor( private logger: LoggingService, private productService: ProductService ) {
         super(logger, productService);
      }

    GetConcreteControllerName() {
       return 'ProductController';
    }
}
