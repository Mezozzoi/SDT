import BaseRepository from "./repository";
import TenderModel from "../models/tender.model";
import {CreationAttributes} from "sequelize";

class TenderRepository extends BaseRepository<TenderModel> {
    constructor() {
        super(TenderModel);
    }
}

export default new TenderRepository();