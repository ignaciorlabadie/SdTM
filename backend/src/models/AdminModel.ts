import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Admin extends Model {
    declare id: number
    declare userId: number
    declare name: string
    declare lastname: string
    declare dni: string
    declare cellphone: string
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt: Date | null
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'admins',
        timestamps: true,
        paranoid: true,
    },
)

export default Admin
