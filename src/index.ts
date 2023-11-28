import express from "express";
import router from "./routers";
import bodyParser from "body-parser";
import sequelize from "./sequelize";
import errorHandler from "./errorHandler";

sequelize.sync({force: true});

const port = 5000;

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use(errorHandler);

app.listen(port);
console.log(`App listening on ${port}`)