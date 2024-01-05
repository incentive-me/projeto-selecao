import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function middlewareJWT(req, res, next: NextFunction){
    const token = req.headers.authorization

    const verify = jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(400).json({error: err.message})
            
        } 
        req.body.userInfo = decoded
        next()
    })
}