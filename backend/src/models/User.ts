import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare activo: boolean
    declare createdAt: Date
    declare updatedAt: Date


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
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    },
)
export default User