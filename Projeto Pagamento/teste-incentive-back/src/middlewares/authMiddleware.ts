import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Unathorized no token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, env.JWT_PASS ?? "") as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unathorized user" });
    }

    const LoggedUser: User = user;

    req.user = LoggedUser;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
