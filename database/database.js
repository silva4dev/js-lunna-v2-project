const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress","root", "Rlxrvt1241x@", {
    host:"localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;
