import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare active: boolean
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt: Date | null
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [3, 254],
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    },
)
export default User
