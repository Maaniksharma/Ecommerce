import mysql from 'mysql2/promise';
export const connection = await mysql.createConnection({
  host: 'db-mysql-ecommerce-do-user-13826308-0.c.db.ondigitalocean.com',
  user: 'doadmin',
  password: process.env.SQL_PASSWORD,
  database: 'apnidukkan',
  port: 25060,
});
