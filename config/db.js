import mysql2 from "mysql2/promise";
import envConfig from "./env.config.js";

export const pool = mysql2.createPool(
  {
    user: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    host: envConfig.DB_HOST,
    waitForConnections: true,
    connectionLimit: 1000,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    port: envConfig.DB_PORT,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  },
);


