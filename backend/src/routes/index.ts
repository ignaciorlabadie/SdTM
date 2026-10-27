import { Router } from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import patientRoutes from './patientRoutes.js'
import professionalRoutes from './professionalRoutes.js'
import adminRoutes from './adminRoutes.js'
import scheduleRoutes from './scheduleRoutes.js'
import appointmentRoutes from './appointmentRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/patients', patientRoutes)
router.use('/professionals', professionalRoutes)
router.use('/admins', adminRoutes)
router.use('/schedules', scheduleRoutes)
router.use('/appointments', appointmentRoutes)

export default router
