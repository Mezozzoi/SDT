import BaseRepository from "./repository";
import ProposalModel from "../models/proposal.model";

class ProposalRepository extends BaseRepository<ProposalModel> {
    constructor() {
        super(ProposalModel);
    }
}

export default new ProposalRepository();