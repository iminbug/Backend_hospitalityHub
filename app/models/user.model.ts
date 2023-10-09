import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, SequelizeTypes: typeof DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: SequelizeTypes.STRING,
    },
    email: {
      type: SequelizeTypes.STRING,
    },
    password: {
      type: SequelizeTypes.STRING,
    },
  });

  return User;
};
