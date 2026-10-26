import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Professional extends Model {
    declare id: number
    declare userId: number
    declare name: string
    declare lastname: string
    declare dni: string
    declare cellphone: string
    declare specialty: string
    declare licenseNumber: string
    declare createdAt: Date
    declare updatedAt: Date
}

Professional.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },
        dni: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },

        cellphone: {
            type: DataTypes.STRING(25),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 25],
            },
        },
        specialty: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },
        licenseNumber: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [1, 30],
            },
        },
    },
    {
        sequelize,
        tableName: 'professionals',
        timestamps: true,
    },
)

export default Professional
