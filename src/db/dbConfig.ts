import { Product } from "../entity/Product";
import "reflect-metadata"
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password@123",
    database: "productdb",
    entities: [Product],
    synchronize: true,
    logging: false,
}
);



// import { createConnection } from "typeorm"
// import { Product } from "src/entities/Product"

//  export const connectDb = async () => {
//     try {
//         await createConnection({
//             type: "mysql",
//             host: 'localhost',
//             port: 3306,
//             username: 'root',
//             password: 'Password@123',
//             database: 'productdb',
//             entities: ['dist/**/*.Product.js'], //[Product],
//             synchronize: true
//         })
//         console.log('Connected to mysql db...')
//     } catch (error) {
//         console.log(error)
//         throw new Error("Unable to connect to db..");

//     }
// }

