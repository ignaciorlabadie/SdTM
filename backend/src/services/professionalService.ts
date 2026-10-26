import User from '../models/UserModel.js'
import Professional from '../models/ProfessionalModel.js'
import { UserAttributes as userAttributes } from '../types/user/UserAttributes.js'
import type { CreateProfessional } from '../types/professional/CreateProfessional.js'
import type { UpdateProfessional } from '../types/professional/UpdateProfessional.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

export class ProfessionalService {
    async getAllProfessionals() {
        const professionals = await Professional.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
            order: [['id', 'ASC']],
        })

        return professionals
    }

    async getProfessionalById(id: number) {
        const professional = await Professional.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }

        return professional
    }

    async getProfessionalByUserId(userId: number) {
        const professional = await Professional.findOne({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }

        return professional
    }

    async getProfessionalByLicenseNumber(licenseNumber: string) {
        const professional = await Professional.findOne({
            where: { licenseNumber },
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }

        return professional
    }

    async createProfessionalForUser(userId: number, data: CreateProfessional) {
        const existingDni = await Professional.findOne({
            where: { dni: data.dni },
        })
        if (existingDni) {
            throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
        }

        const existingMatricula = await Professional.findOne({
            where: { licenseNumber: data.licenseNumber },
        })
        if (existingMatricula) {
            throw new AppError(409, MESSAGES.MATRICULA_YA_REGISTRADA)
        }

        const professional = await Professional.create({
            userId,
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            cellphone: data.cellphone,
            specialty: data.specialty,
            licenseNumber: data.licenseNumber,
        })

        return await this.getProfessionalById(professional.id)
    }

    async updateProfessionalProfile(
        id: number,
        data: Partial<UpdateProfessional>,
    ) {
        const professional = await Professional.findByPk(id)
        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }

        if (data.dni && data.dni !== professional.dni) {
            const existingDni = await Professional.findOne({
                where: { dni: data.dni },
            })
            if (existingDni && existingDni.id !== id) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }
        }

        if (
            data.licenseNumber &&
            data.licenseNumber !== professional.licenseNumber
        ) {
            const existingMatricula = await Professional.findOne({
                where: { licenseNumber: data.licenseNumber },
            })
            if (existingMatricula && existingMatricula.id !== id) {
                throw new AppError(409, MESSAGES.MATRICULA_YA_REGISTRADA)
            }
        }

        await professional.update(data)
        return await this.getProfessionalById(id)
    }

    async deleteProfessional(id: number) {
        const professional = await Professional.findByPk(id)
        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }
        await professional.destroy()
        return { message: 'Profesional eliminado correctamente' }
    }
}

export const professionalService = new ProfessionalService()
