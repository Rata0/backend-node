import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../db';

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id?: number,
  name: string,
  price: string,
  img: string,
  description: string,
  type_id: number,
  brand_id: number,
}

const Product = sequelize.define<ProductModel>('product', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  price: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  img: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  description: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  type_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

export default Product;
