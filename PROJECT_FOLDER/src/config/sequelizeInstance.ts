import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import dbConfig from "./base.config";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env as keyof typeof dbConfig];

export const createSequelizeConfig = (option?: {
  useModels?: boolean;
  logging?: boolean;
}) => {
  const logging = option?.logging ?? false;
  const useModels = option?.useModels ?? false;
  const options: SequelizeOptions = {
    ...config,
    logging,
  };

  if (useModels) {
    options.models = [__dirname + "/../models/*.ts"];
  }

  return options;
};

export const createSequelizeInstance = (option?: {
  useModels?: boolean;
  logging?: boolean;
}) => {
  const options = createSequelizeConfig(option);

  return new Sequelize(options);
};
