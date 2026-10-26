const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DNI_REGEX = /^\d{7,8}$/
const PHONE_REGEX = /^\+?\d{6,25}$/
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export const PASSWORD_MIN = 8
export const PASSWORD_MAX = 72

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email)
}

export function isValidPassword(password: unknown): password is string {
    return (
        typeof password === 'string' &&
        password.length >= PASSWORD_MIN &&
        password.length <= PASSWORD_MAX
    )
}

export function isValidDni(dni: string): boolean {
    return DNI_REGEX.test(dni)
}

export function isValidPhone(phoneNumber: string): boolean {
    return PHONE_REGEX.test(phoneNumber)
}

export function isValidText(
    value: unknown,
    min: number,
    max: number,
): value is string {
    if (typeof value !== 'string') {
        return false
    }

    const valueLength = value.trim().length

    return valueLength >= min && valueLength <= max
}

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase()
}

export function isValidDate(date: string): boolean {
    if (!DATE_REGEX.test(date)) {
        return false
    }

    const parsedDate = new Date(`${date}T00:00:00Z`)

    if (Number.isNaN(parsedDate.getTime())) {
        return false
    }

    return parsedDate.toISOString().slice(0, 10) === date
}

export function isValidBirthDate(date: string): boolean {
    if (!isValidDate(date)) {
        return false
    }

    return date <= new Date().toISOString().slice(0, 10)
}
