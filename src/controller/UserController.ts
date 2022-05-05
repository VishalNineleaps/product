import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
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


    /*
        @desc  Validates user by username
        @route GET /api/user/validate
    */
    public validateUser = async (req: Request, res: Response) => {

        const username = res.locals.payLoad.username

        const savedUser = await this.userRepository.getUser(username)
        if (savedUser?.username === username) {
            res.status(200).json({
                message: 'Token validated, user is authorized'
            })
        }
        else {
            res.status(401).json({
                message: 'Not authorised'
            })
        }
    }


    /*
        @desc  Register user with user role
        @route POST /api/user/register
    */
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


    /*
        @desc  Login user using username and password
        @route POST /api/user/login
    */
    public login = async (req: Request, res: Response) => {

        let { username, password, user_role } = req.body;

        const savedUser = await this.userRepository.getUser(username);

        let savedUserpassword: any = savedUser?.password;

        if (savedUser?.username != username) {
            res.status(401).json({
                message: 'Invalid username'
            })
        } else if (savedUser?.password) {
            bcryptjs.compare(password, savedUserpassword).then((isMatch) => {
                if (!isMatch)
                    res.status(401).json({ message: "Invalid password" });
                return;
            })
        }

        const token = this.authentication.createSignJwt(username, password, user_role)
        res.json({
            message: "Token has been generated",
            token: token
        }).send()
    }

    /*
        @desc  Get all users
        @route GET /api/user/all
    */
    public getAllUser = async (req: Request, res: Response) => {
        try {
            const allUsers = await this.userRepository.allUsers()
            res.json({ allUsers: allUsers }).send()
        } catch (error) {
            res.json({
                message: error.message,
                error
            })
        }
    }

}

function convertJsonToEntity(username: string, hash: string, userRole: UserRole) {
    return new User(username, hash, userRole);
}