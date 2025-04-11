module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define('Block', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      layer: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      coordinates: {
        type: DataTypes.JSONB
      },
      properties: {
        type: DataTypes.JSONB
      }
    });
  
    Block.associate = function(models) {
      Block.belongsTo(models.CadFile, {
        foreignKey: 'fileId',
        as: 'file'
      });
    };
  
    return Block;
  };