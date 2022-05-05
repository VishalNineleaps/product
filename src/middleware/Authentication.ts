import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/UserRepository';
import { config } from '../config/config';
import { UserRole } from 'src/entity/User';

export class Authentication {

    public extractJwtToken = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Validating Token');

        let token = req.headers.authorization?.split(' ')[1];

        if (token) {
            jwt.verify(token, config.server.token.secret, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        message: error.message,
                        error
                    });
                } else {
                    res.locals.payLoad = decoded
                    next();
                }
                return;
            });
        } else {
            return res.status(500).json({
                message: 'Error in extracting token from headers'
            });
        }
        return;
    }


    public createSignJwt = (userName: string, password: string, userRole: UserRole) => {

        var timeSinceEpoch = new Date().getTime();
        var expireTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
        var expirationTimeInSeconds = Math.floor(expireTime / 1000);
        console.log(`Atempting to sign token for ${userName}`);

        try {
            return jwt.sign({
                username: userName,
                user_role: userRole
            },
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: expirationTimeInSeconds
                }
            );
        } catch (error) {
            console.error(error.message)
        }
        return
    };


    // public validateUser(req: Request, res: Response, next: NextFunction, userRole: UserRole) {
    public async validateUser(req: Request, res: Response, next: NextFunction, userRoles: UserRole[]) {

        const username = res.locals.payLoad.username
        const user_role = res.locals.payLoad.user_role
        console.log(`Validating user : ${username} `)

        const savedUser: any = await new UserRepository().getUser(username)
        if (savedUser?.username != username) {
            res.status(401).json({ message: 'Not authorised' })
        }
        console.log(Object.values(userRoles))
        if (Object.values(userRoles).find(role => user_role == role.toUpperCase())) {
            next()
        } else {
            res.status(403).json({ message: 'User does not have permission ' })
        }

    }


}


