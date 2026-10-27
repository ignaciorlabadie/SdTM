import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError.js'

export function validateId(paramName = 'id') {
    return (req: Request, _res: Response, next: NextFunction) => {
        const value = req.params[paramName]
        const id = Number(value)

        if (!Number.isInteger(id) || id <= 0) {
            return next(new AppError(400, 'ID inválido'))
        }

        req.params[paramName] = String(id)
        next()
    }
}
