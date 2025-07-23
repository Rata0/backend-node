import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../db';

interface CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
  id?: number,
  user_id: number,
  product_id?: number,
  quantity?: number,
}

const Cart = sequelize.define<CartModel>('cart', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  product_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
});

export default Cart;
