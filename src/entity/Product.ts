import { Entity, PrimaryGeneratedColumn, Double, Column, PrimaryColumn } from "typeorm";

@Entity('product')
export class Product {

constructor(name:string,price:Double,inventory:number,description:string){

    this.name=name;
    this.price=price;
    this.inventory=inventory;
    this.description=description;
}
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    name: string;

    @Column({
        type: 'double',
        default: 0.0
    })
    price: Double;

    @Column({type:'int',
        default:0
    })
    inventory: number;

    @Column({
        default:null
    })
    description: string;
}


