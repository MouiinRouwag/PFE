const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize").Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.warn('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};



db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.organisme = require("./organisme.model.js")(sequelize, Sequelize);
db.etudiant = require("./etudiant.model.js")(sequelize, Sequelize);
db.stage = require("./stage.model.js")(sequelize, Sequelize);
db.departement = require("./departement.js")(sequelize, Sequelize);
db.responsablesstage = require("./responsable_stage.js")(sequelize, Sequelize);
module.exports = db;