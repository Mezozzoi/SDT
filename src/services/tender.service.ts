import ProposalRepository from "../repositories/proposal.repository";
import UserRepository from "../repositories/user.repository";
import TenderRepository from "../repositories/tender.repository";
import UnitOfWork from "../common/unitOfWork";
import sequelize from "../common/sequelize";
import ReportRepository from "../repositories/report.repository";
import ReportModel from "../models/report.model";
import ProposalModel from "../models/proposal.model";
import {TenderStatus} from "../models/tender.model";
import ReportDto from "../routers/dtos/report.dto";

class TenderService {
    constructor(private proposalRepository: typeof ProposalRepository,
                private userRepository: typeof UserRepository,
                private tenderRepository: typeof TenderRepository,
                private reportRepository: typeof ReportRepository) {}

    async getProposals(tenderId: number): Promise<ProposalModel[]> {
        return this.proposalRepository.findAll({where: {tenderId: tenderId}});
    }

    async chooseWinner(proposalId: number): Promise<ReportDto | null> {
        const uow = new UnitOfWork(sequelize);
        await uow.begin();

        try {
            const proposal = await this.proposalRepository.findByPk(proposalId);

            let report: ReportModel;

            if (!proposal) throw new Error("Invalid proposal");

            report = await this.reportRepository.create({
                winnerId: proposalId
            });

            await this.tenderRepository.update(proposal.tenderId, {
                tenderStatus: TenderStatus.CLOSED
            })

            await uow.commit();

            return report;
        } catch (e) {
            await uow.rollback();

            throw e;
        }
    }
}

export default new TenderService(ProposalRepository, UserRepository, TenderRepository, ReportRepository);