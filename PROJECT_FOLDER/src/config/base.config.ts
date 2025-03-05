import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "yourpassword",
    database: process.env.DB_NAME || "data_kepegawaian",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres" as Dialect,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  },
};

export default config;
