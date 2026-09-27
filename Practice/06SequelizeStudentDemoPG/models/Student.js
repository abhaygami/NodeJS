import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define(
    'Student',
    {
        rollno: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        div: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        course: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    },
    {
        tableName: 'student',
        timestamps: false
    }
);

export default Student;