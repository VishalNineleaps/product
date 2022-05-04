import { Request, Response, NextFunction } from "express";
import bcryptjs, { hash } from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";
import { User, UserRole } from "../entity/User";
import { Authentication } from "../middleware/Authentication";

export class UserController {


    private userRepository: UserRepository;
    private authentication: Authentication;
    constructor() {
        this.userRepository = new UserRepository();
        this.authentication = new Authentication();
    }


    public validateUser = (req: Request, res: Response) => {

        try {
            res.status(200).json({
                message: 'Token validated, user is authorized'
            })

        } catch (error) {
            res.send('Token validated')
        }

    }





    public registerUser = (req: Request, res: Response) => {

        var { username, password, user_role } = req.body;
       
        bcryptjs.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(500).json({
                    message: hashError.message,
                    error: hashError
                });
            }

            const user = convertJsonToEntity(username, hash, user_role)

            this.userRepository.saveUser(user)
            return res.json({
                message: `User ${user.username} has been registered successfully`,
            }).send()
        });


    }

    public login = (req: Request, res: Response) => {
        let { username, password } = req.body;

        const token = this.authentication.createSignJwt(username, password)

        res.json({
            message: "Token has been generated",
            token: token
        }).send()
    }


    public getUsers = (arg0: string, getUsers: any) => {
        throw new Error("Method not implemented.");
        return;
    }

}

function convertJsonToEntity(username: string, hash: string, userRole: UserRole) {
    return new User(username, hash, userRole);
}