import User from './UserModel.js'
import Admin from './AdminModel.js'
import Patient from './PatientModel.js'
import Professional from './ProfessionalModel.js'
import Appointment from './AppointmentModel.js'
import Schedule from './ScheduleModel.js'

const FK_RESTRICT = { onUpdate: 'CASCADE', onDelete: 'RESTRICT' } as const

User.hasOne(Patient, {
    foreignKey: 'userId',
    as: 'patient',
    ...FK_RESTRICT,
})
Patient.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    ...FK_RESTRICT,
})

User.hasOne(Professional, {
    foreignKey: 'userId',
    as: 'professional',
    ...FK_RESTRICT,
})
Professional.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    ...FK_RESTRICT,
})

User.hasOne(Admin, {
    foreignKey: 'userId',
    as: 'admin',
    ...FK_RESTRICT,
})

Admin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    ...FK_RESTRICT,
})

Patient.hasMany(Appointment, {
    foreignKey: 'patientId',
    as: 'appointment',
    ...FK_RESTRICT,
})
Appointment.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient',
    ...FK_RESTRICT,
})

Professional.hasMany(Appointment, {
    foreignKey: 'professionalId',
    as: 'appointment',
    ...FK_RESTRICT,
})
Appointment.belongsTo(Professional, {
    foreignKey: 'professionalId',
    as: 'professional',
    ...FK_RESTRICT,
})

Schedule.hasMany(Appointment, {
    foreignKey: 'scheduleId',
    as: 'appointment',
    ...FK_RESTRICT,
})
Appointment.belongsTo(Schedule, {
    foreignKey: 'scheduleId',
    as: 'schedule',
    ...FK_RESTRICT,
})

Professional.hasMany(Schedule, {
    foreignKey: 'professionalId',
    as: 'schedule',
    ...FK_RESTRICT,
})
Schedule.belongsTo(Professional, {
    foreignKey: 'professionalId',
    as: 'professional',
    ...FK_RESTRICT,
})

export { User, Admin, Patient, Professional, Appointment, Schedule }
