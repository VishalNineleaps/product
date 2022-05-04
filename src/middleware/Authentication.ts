import { number } from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { User } from '../entity/User'

export class Authentication {

    public  extractJwtToken=async(req: Request, res: Response, next: NextFunction) =>{

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
                    res.locals.jwt = decoded;
                    next();

                }
                return;
            }
            );

        } else {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        return


    }


    public createSignJwt = (userName: string, password: string) => {

        var timeSinceEpoch = new Date().getTime();
        var expireTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
        var expirationTimeInSeconds = Math.floor(expireTime / 1000);
        console.log(`Atempting to sign token for ${userName}`);

        try {
            return jwt.sign({
                username: userName
            },
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: expirationTimeInSeconds
                }
            );

        } catch (error) {
            //log:(error.message,error)
            console.error(error.message)
        }
        return
    };




}


