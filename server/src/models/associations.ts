import Cart from './cart';
import User from './user';

export const setupAssociations = () => {
  User.hasOne(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Cart.belongsTo(User, {
    foreignKey: 'user_id'
  });
};
