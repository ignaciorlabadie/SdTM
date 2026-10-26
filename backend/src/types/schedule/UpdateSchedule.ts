import type { WeekDay } from './WeekDayType.js'

export interface UpdateSchedule {
    professionalId?: number
    weekDay?: WeekDay
    startTime?: string
    endTime?: string
    appointmentDuration?: number
    active?: boolean
}
