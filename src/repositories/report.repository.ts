import BaseRepository from "./repository";
import ReportModel from "../models/report.model";

class ReportRepository extends BaseRepository<ReportModel> {
    constructor() {
        super(ReportModel);
    }
}

export default new ReportRepository();