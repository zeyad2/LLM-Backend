import { config } from "dotenv";

config({ path: ".env" });

export default {
  //   DB_PORT: process.env.DB_PORT,
  //   DB_HOST: process.env.DB_HOST,
  //   DB_USER: process.env.DB_USER,
  //   DB_PASSWORD: process.env.DB_PASSWORD,
  //   DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN
};
