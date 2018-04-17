module.exports = (sequelize, DataTypes) => {
  const goal = sequelize.define('goal', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    cards: DataTypes.ARRAY(DataTypes.INTEGER),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    getterMethods: {
      cards() {
        return this.getDataValue('cards') || [];
      }
    },
  });

  return goal;
};