import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from "cors";
import usersCtrl from "./src/routes/UserRouter";
import authCtrl from "./src/routes/AuthRouter";
import contactCtrl from "./src/routes/ContactRouter";
import groupsCtrl from "./src/routes/GroupsRouter";

/** Configuración **/
dotenv.config();
const app = express();
app.use(logger('dev'))
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/** Rutas - API REST **/
app.use('/api', authCtrl);
app.use('/api/user', usersCtrl);
app.use('/api/contact', contactCtrl);
app.use('/api/groups', groupsCtrl);


/** Inicialización del Servidor **/
let port = normalizePort(process.env.PORT || "3002") ;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onListening() {
  let address = server.address();
  console.log(`Running in the port ${port}`);
}
function normalizePort(val) {
  let port = parseInt(val, 10);
    if (isNaN(port)) {return val}
    if (port >= 0) {return port}
    return false;
}
function onError(error) {
  if (error.syscall !== "listen") {throw error}
  switch (error.code) {
    case "EACCES": 
      console.error(port + " requires privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}