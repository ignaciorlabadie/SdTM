import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
    }
}

export function authMiddleware(
    req: AuthRequest,
    _res: Response,
    next: NextFunction,
) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(401, MESSAGES.AUTENTICACION_REQUERIDA)
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            throw new AppError(401, MESSAGES.AUTENTICACION_REQUERIDA)
        }

        const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
            id: number
            email: string
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
        }

        next()
    } catch (error) {
        if (error instanceof AppError) {
            return next(error)
        }
        return next(new AppError(401, MESSAGES.AUTENTICACION_REQUERIDA))
    }
}
