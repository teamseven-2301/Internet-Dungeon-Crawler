const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//local db
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;

//deployment db
// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgresql://idcwewilldeploy:v2_44MJa_3L7kmM7XwWcAwxxwVTb33Nj@db.bit.io:5432/idcwewilldeploy/i-d-c?ssl=true', config)
// module.exports = db
