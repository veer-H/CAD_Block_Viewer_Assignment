module.exports = (sequelize, DataTypes) => {
    const CadFile = sequelize.define('CadFile', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      filepath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      processed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    CadFile.associate = function(models) {
      CadFile.hasMany(models.Block, {
        foreignKey: 'fileId',
        as: 'blocks'
      });
    };
  
    return CadFile;
  };