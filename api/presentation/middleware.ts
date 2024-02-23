import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function middlewareJWT(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization ? req.headers.authorization : ""

    const jwtSecret: string = process.env.SECRETJWT ? process.env.SECRETJWT : ""
    const verify = jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(400).json({error: err.message})
            
        } 
        req.body.userInfo = decoded
        next()
    })
}