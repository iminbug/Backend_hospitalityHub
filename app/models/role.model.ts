import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, SequelizeTypes: typeof DataTypes) => {
  const Role = sequelize.define('roles', {
    id: {
      type: SequelizeTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: SequelizeTypes.STRING,
    },
  });

  return Role;
};
