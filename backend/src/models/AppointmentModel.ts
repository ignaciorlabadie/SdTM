import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
} from 'sequelize'
import sequelize from '../config/database.js'
import type { AppointmentStatus } from '../types/appointment/AppointmentStatusType.js'

class Appointment extends Model<
    InferAttributes<Appointment>,
    InferCreationAttributes<Appointment>
> {
    declare id: CreationOptional<number>
    declare patientId: number
    declare professionalId: number
    declare scheduleId: number
    declare date: string
    declare time: string
    declare status: CreationOptional<AppointmentStatus>
    declare motive: string
    declare observations?: string | null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        professionalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'professionals',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        scheduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'schedules',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                'PENDIENTE',
                'CONFIRMADO',
                'CANCELADO',
                'COMPLETADO',
            ),
            allowNull: false,
            defaultValue: 'PENDIENTE',
        },

        motive: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
            defaultValue: 'Consulta',
        },

        observations: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'appointments',
        timestamps: true,
    },
)

export default Appointment
