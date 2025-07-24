import Brand from './brandModel';
import CartItem from './cartItemModel';
import Cart from './cartModel';
import Product from './productModel';
import Type from './typeModel';
import User from './userModel';

export const setupAssociations = () => {
  User.hasOne(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Cart.belongsTo(User, {
    foreignKey: 'user_id'
  });

  Brand.hasMany(Product, {
    foreignKey: 'brand_id'
  });

  Product.belongsTo(Brand, {
    foreignKey: 'brand_id'
  });

  Type.hasMany(Product, {
    foreignKey: 'type_id'
  });

  Product.belongsTo(Type, {
    foreignKey: 'type_id'
  });

  Cart.hasMany(CartItem, {
    foreignKey: 'cart_id'
  });

  CartItem.belongsTo(Cart, {
    foreignKey: 'cart_id'
  });

  CartItem.belongsTo(Product, {
    foreignKey: 'product_id'
  });

  Product.hasOne(CartItem, {
    foreignKey: 'product_id'
  });
};
