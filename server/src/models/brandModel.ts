import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../db';

interface BrandModel extends Model<InferAttributes<BrandModel>, InferCreationAttributes<BrandModel>> {
  id?: number,
  name: string,
}

const Brand = sequelize.define<BrandModel>('brand', {
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

export default Brand;
