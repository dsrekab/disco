import { Entity } from './entity';

export class Stock extends Entity {
    name: string;
    brand: string;
    upc?: string;
}
