import User from '../models/UserModel.js'
import Admin from '../models/AdminModel.js'
import { UserAttributes as userAttributes } from '../types/user/UserAttributes.js'
import type { CreateAdmin } from '../types/admin/CreateAdmin.js'
import type { UpdateAdmin } from '../types/admin/UpdateAdmin.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

export class AdminService {
    async getAllAdmins() {
        const admins = await Admin.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
            order: [['id', 'ASC']],
        })

        return admins
    }

    async getAdminById(id: number) {
        const admin = await Admin.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!admin) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }

        return admin
    }

    async getAdminByUserId(userId: number) {
        const admin = await Admin.findOne({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!admin) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }

        return admin
    }

    async createAdminForUser(userId: number, data: CreateAdmin) {
        const existingDni = await Admin.findOne({ where: { dni: data.dni } })
        if (existingDni) {
            throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
        }

        const admin = await Admin.create({
            userId,
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            cellphone: data.cellphone,
        })

        return await this.getAdminById(admin.id)
    }

    async updateAdminProfile(id: number, data: Partial<UpdateAdmin>) {
        const admin = await Admin.findByPk(id)
        if (!admin) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }

        if (data.dni && data.dni !== admin.dni) {
            const existingDni = await Admin.findOne({
                where: { dni: data.dni },
            })
            if (existingDni && existingDni.id !== id) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }
        }

        await admin.update(data)
        return await this.getAdminById(id)
    }

    async deleteAdmin(id: number) {
        const admin = await Admin.findByPk(id)
        if (!admin) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }
        await admin.destroy()
        return { message: 'Administrador eliminado correctamente' }
    }
}

export const adminService = new AdminService()
