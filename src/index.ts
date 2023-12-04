import express from "express";
import router from "./routers";
import bodyParser from "body-parser";
import sequelize from "./common/sequelize";
import errorHandler from "./common/errorHandler";
import UserRepository from "./repositories/user.repository";
import {UserType} from "./models/user.model";
import TenderRepository from "./repositories/tender.repository";
import ProposalRepository from "./repositories/proposal.repository";
import seed from "./seeder";

async function bootstrap() {
    await sequelize.sync({force: true})

    const port = 5000;

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(router);

    app.use(errorHandler);

    app.listen(port);
    console.log(`App listening on ${port}`);

    await seed();
}

bootstrap();