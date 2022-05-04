import { Router } from "express";
import { UserController } from "../controller/UserController"
import { AppDataSource } from "../db/dbConfig";
import { Authentication } from "../middleware/Authentication"

export class UserRouter {

    public router: Router;
    private userController: UserController;
    private authentication: Authentication;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.authentication = new Authentication();
        this.routes();
    }

    public routes() {
        AppDataSource.initialize()
            .then(() => {
                this.router.get('/validate', this.authentication.extractJwtToken,
                    this.userController.validateUser)
                this.router.post('/register', this.userController.registerUser)
                this.router.post('/login', this.userController.login)
                this.router.get('/all', this.userController.getUsers)

            }).catch((error) => {
                console.error(error);
            })

    }
}