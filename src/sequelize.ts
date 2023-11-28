import {Sequelize} from "sequelize-typescript";
import TenderModel from "./models/tender.model";
import UserModel from "./models/user.model";
import TenderParticipantModel from "./models/tender-user.model";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "tender_system",
    password: "root",
    username: "postgres",
    models: [TenderModel, UserModel, TenderParticipantModel],
    sync: {
        force: true
    },
    logging: () => true
});

export default sequelize;