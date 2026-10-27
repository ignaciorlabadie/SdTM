import type { NextFunction, Request, Response } from 'express'
import { adminService } from '../services/adminService.js'

export class AdminController {
    async getAllAdmins(_req: Request, res: Response, next: NextFunction) {
        try {
            const admins = await adminService.getAllAdmins()
            return res.status(200).json(admins)
        } catch (error) {
            return next(error)
        }
    }

    async getAdminById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const admin = await adminService.getAdminById(id)
            return res.status(200).json(admin)
        } catch (error) {
            return next(error)
        }
    }

    async getAdminByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId)
            const admin = await adminService.getAdminByUserId(userId)
            return res.status(200).json(admin)
        } catch (error) {
            return next(error)
        }
    }

    async updateAdminProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const admin = await adminService.updateAdminProfile(id, req.body)
            return res.status(200).json(admin)
        } catch (error) {
            return next(error)
        }
    }

    async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await adminService.deleteAdmin(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const adminController = new AdminController()
