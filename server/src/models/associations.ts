import User from './user';
import Cart from './cart';

export const setupAssociations = () => {
  User.hasOne(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })
  
  Cart.belongsTo(User, {
    foreignKey: 'user_id'
  })
}
