require("ts-node/register");
const { createSequelizeConfig } = require("./sequelizeInstance");

const development = createSequelizeConfig({ useModels: true });
module.exports = {
  development,
};
