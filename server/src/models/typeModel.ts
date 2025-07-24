import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../db';

interface TypeModel extends Model<InferAttributes<TypeModel>, InferCreationAttributes<TypeModel>> {
  id?: number,
  name: string,
}

const Type = sequelize.define<TypeModel>('type', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false 
  }
});

export default Type;
