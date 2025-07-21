import sequelize from '../db'
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: number,
  name: string,
  email: string,
  password: string,
  role: string,
}

const User = sequelize.define<UserModel>('user', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  role: { 
    type: DataTypes.STRING, 
    defaultValue: 'USER' 
  },
})

export default User
