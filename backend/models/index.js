const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cadfiles = require("./cadfile.model.js")(sequelize, Sequelize);
db.blocks = require("./block.model.js")(sequelize, Sequelize);

// Associations
db.cadfiles.hasMany(db.blocks, { foreignKey: 'fileId', as: 'blocks' });
db.blocks.belongsTo(db.cadfiles, { foreignKey: 'fileId', as: 'file' });

module.exports = db;