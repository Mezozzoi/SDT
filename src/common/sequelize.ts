import {Sequelize} from "sequelize-typescript";
import TenderModel from "../models/tender.model";
import UserModel from "../models/user.model";
import ProposalModel from "../models/proposal.model";
import cls from "cls-hooked";
import ReportModel from "../models/report.model";

const dbNamespace = cls.createNamespace("dbNamespace");

Sequelize.useCLS(dbNamespace);

const models = [TenderModel, UserModel, ProposalModel, ReportModel]

const sequelize = new Sequelize(process.env["NODE_ENV"] === "test" ? {
    dialect: "sqlite",
    storage: ":memory:",
    models: models,
    benchmark: true,
    sync: {
        force: true
    },
    logging: () => false
} : {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "tender_system",
    password: "root",
    username: "postgres",
    models: models,
    benchmark: true,
    sync: {
        force: true
    },
    logging: () => true
});

export default sequelize;