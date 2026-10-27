import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError.js'
import {
    isValidEmail,
    isValidPassword,
    isValidDni,
    isValidPhone,
    isValidDate,
    isValidBirthDate,
} from '../utils/validation.js'
import { MESSAGES } from '../errors/messages.js'

export function validateLogin(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError(400, 'Email y contraseña son obligatorios'))
    }

    if (!isValidEmail(email)) {
        return next(new AppError(400, 'Email inválido'))
    }

    if (typeof password !== 'string' || password.length === 0) {
        return next(new AppError(400, 'Contraseña inválida'))
    }

    next()
}

export function validatePatientAccount(req: Request, _res: Response, next: NextFunction) {
    const { email, password, name, lastname, dni, cellphone, birthDate, address } =
        req.body

    if (
        !email ||
        !password ||
        !name ||
        !lastname ||
        !dni ||
        !cellphone ||
        !birthDate ||
        !address
    ) {
        return next(new AppError(400, 'Todos los campos son obligatorios'))
    }

    if (!isValidEmail(email)) {
        return next(new AppError(400, 'Email inválido'))
    }
    if (!isValidPassword(password)) {
        return next(new AppError(400, 'Contraseña inválida'))
    }
    if (!isValidDni(String(dni))) {
        return next(new AppError(400, MESSAGES.DNI_YA_REGISTRADO.includes('ya') ? 'DNI inválido' : 'DNI inválido'))
    }
    if (!isValidPhone(String(cellphone))) {
        return next(new AppError(400, 'Teléfono inválido'))
    }
    if (!isValidBirthDate(birthDate)) {
        return next(new AppError(400, 'Fecha de nacimiento inválida'))
    }

    next()
}

export function validateProfessionalAccount(req: Request, _res: Response, next: NextFunction) {
    const {
        email,
        password,
        name,
        lastname,
        dni,
        cellphone,
        licenseNumber,
        speciality,
    } = req.body

    if (
        !email ||
        !password ||
        !name ||
        !lastname ||
        !dni ||
        !cellphone ||
        !licenseNumber ||
        !speciality
    ) {
        return next(new AppError(400, 'Todos los campos son obligatorios'))
    }

    if (!isValidEmail(email)) {
        return next(new AppError(400, 'Email inválido'))
    }
    if (!isValidPassword(password)) {
        return next(new AppError(400, 'Contraseña inválida'))
    }
    if (!isValidDni(String(dni))) {
        return next(new AppError(400, 'DNI inválido'))
    }
    if (!isValidPhone(String(cellphone))) {
        return next(new AppError(400, 'Teléfono inválido'))
    }

    next()
}

export function validateAdminAccount(req: Request, _res: Response, next: NextFunction) {
    const { email, password, name, lastname } = req.body

    if (!email || !password || !name || !lastname) {
        return next(new AppError(400, 'Todos los campos son obligatorios'))
    }

    if (!isValidEmail(email)) {
        return next(new AppError(400, 'Email inválido'))
    }
    if (!isValidPassword(password)) {
        return next(new AppError(400, 'Contraseña inválida'))
    }

    next()
}
