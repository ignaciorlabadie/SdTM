import type { AppointmentStatus } from './AppointmentStatusType.js'

export interface CreateAppointment {
    patientId: number
    professionalId: number
    scheduleId: number
    date: string
    time: string
    status: AppointmentStatus
    motive: string
    observations?: string | null
}
