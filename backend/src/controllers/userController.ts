import type { NextFunction, Request, Response } from 'express'
import { userService } from '../services/userService.js'

export class UserController {
    async getAllUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers()
            return res.status(200).json(users)
        } catch (error) {
            return next(error)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const user = await userService.getUserById(id)
            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email as string
            const user = await userService.getUserbyEmail(email)
            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const user = await userService.updateUser(id, req.body)
            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await userService.deleteUser(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async forceDeleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await userService.forceDeleteUser(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const userController = new UserController()
