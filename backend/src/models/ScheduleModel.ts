import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
} from 'sequelize'
import sequelize from '../config/database.js'
import type { WeekDay } from '../types/schedule/WeekDayType.js'

class Schedule extends Model<
    InferAttributes<Schedule>,
    InferCreationAttributes<Schedule>
> {
    declare id: CreationOptional<number>
    declare professionalId: number
    declare weekDay: WeekDay
    declare startTime: string
    declare endTime: string
    declare appointmentDuration: number
    declare active: CreationOptional<boolean>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        weekDay: {
            type: DataTypes.ENUM(
                'LUNES',
                'MARTES',
                'MIERCOLES',
                'JUEVES',
                'VIERNES',
                'SABADO',
                'DOMINGO',
            ),
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        appointmentDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 10,
                max: 240,
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        tableName: 'schedules',
        timestamps: true,
        validate: {
            isStartBeforeEnd(this: Schedule) {
                if (this.startTime >= this.endTime) {
                    throw new Error(
                        'La hora de inicio (startTime) debe ser estrictamente anterior a la hora de fin (endTime).',
                    )
                }
            },
        },
    },
)

export default Schedule
