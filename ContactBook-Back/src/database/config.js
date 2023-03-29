import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelizes = new sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  port: process.env.DB_PORT,
});

sequelizes.authenticate().then(() => {
    console.log(`Connection at "${process.env.DB_DATABASE}" successfully.`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelizes.sync({ force: true }).then(() => {});

export default {sequelize }