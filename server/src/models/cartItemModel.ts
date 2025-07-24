import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../db';

interface CartItemModel extends Model<InferAttributes<CartItemModel>, InferCreationAttributes<CartItemModel>> {
  id?: number,
  product_id: number,
  cart_id: number,
}

const CartItem = sequelize.define<CartItemModel>('cart_item', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  product_id: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  cart_id: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
});

export default CartItem;
