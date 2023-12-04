import {beforeAll, beforeEach, describe, expect, it, test} from "@jest/globals";
import TenderModel, {TenderStatus} from "../src/models/tender.model";
import UserModel, {UserType} from "../src/models/user.model";
import sequelize from "../src/common/sequelize";
import ProposalModel from "../src/models/proposal.model";
import UserRepository from "../src/repositories/user.repository";
import UnitOfWork from "../src/common/unitOfWork";
import ReportRepository from "../src/repositories/report.repository";
import TenderRepository from "../src/repositories/tender.repository";
import ProposalRepository from "../src/repositories/proposal.repository";
import TenderService from "../src/services/tender.service";

beforeAll(async () => {
    await sequelize.sync({force: true});
});

beforeEach(async () => {
    await sequelize.truncate();
});

describe("Repositories", () => {
    test("Create report", async () => {
        await UserRepository.create({
            name: "test",
            type: UserType.CLIENT
        });

        await UserRepository.create({
            name: "test",
            type: UserType.PARTICIPANT
        });

        await TenderRepository.create({
            budget: 1,
            ownerId: 1,
            title: "Test",
        });

        await ProposalRepository.create({
            budget: 1,
            participantId: 2,
            tenderId: 1
        });

        await ReportRepository.create({
            winnerId: 1
        });

        const winner = await ReportRepository.findOne();

        expect(winner).toMatchObject({
            winnerId: 1
        });
    });

    test("Find all participants", async () => {
        const client = await UserModel.create({
            type: UserType.CLIENT,
            name: "Pterigoplicht"
        });

        const participant1 = await UserModel.create({
            type: UserType.PARTICIPANT,
            name: "Ciliophora"
        });

        const participant2 = await UserModel.create({
            type: UserType.PARTICIPANT,
            name: "Gregory"
        });

        const tenderId = (await TenderModel.create({
            title: "Uranium tablets",
            ownerId: client.id,
            budget: 1000,
        })).id;

        await ProposalModel.create({
            tenderId: tenderId,
            participantId: participant1.id,
            budget: 100
        })

        await ProposalModel.create({
            tenderId: tenderId,
            participantId: participant2.id,
            budget: 12
        })

        const participants = (await TenderModel.findByPk(tenderId, {
            include: {model: UserModel, as: "participants"}
        }))?.participants;

        expect(participants).toHaveLength(2);
    })
})

describe("Unit of Work", () => {
    it("Should commit", async () => {
        const uow = new UnitOfWork(sequelize);
        await uow.begin();

        await UserRepository.create({
            type: UserType.CLIENT,
            name: "test"
        })

        await uow.commit();

        const users = await UserRepository.findAll();

        expect(users).toHaveLength(1);
    })

    it("Should rollback", async () => {
        const uow = new UnitOfWork(sequelize);
        await uow.begin();

        let n = 5;

        for (let i = 0; i < n; i++) {
            await UserRepository.create({
                name: "test",
                type: UserType.PARTICIPANT
            });
        }

        let participants = await UserRepository.findAll();

        expect(participants).toHaveLength(n);

        await uow.rollback();

        participants = await UserRepository.findAll();


        expect(participants).toHaveLength(0);
    })
})

describe("Services", () => {
    test("View proposals", async () => {
        const client = await UserRepository.create({
            name: "test",
            type: UserType.CLIENT
        });

        const participant1 = await UserRepository.create({
            name: "test",
            type: UserType.PARTICIPANT
        });

        const participant2 = await UserRepository.create({
            name: "test",
            type: UserType.PARTICIPANT
        });

        const participant3 = await UserRepository.create({
            name: "test",
            type: UserType.PARTICIPANT
        });

        const tender = await TenderRepository.create({
            budget: 1,
            ownerId: client.id,
            title: "test",
        });

        await ProposalRepository.create({
            budget: 1,
            participantId: participant1.id,
            tenderId: tender.id
        });

        await ProposalRepository.create({
            budget: 1,
            participantId: participant2.id,
            tenderId: tender.id
        });

        await ProposalRepository.create({
            budget: 1,
            participantId: participant3.id,
            tenderId: tender.id
        });

        const proposals = await TenderService.getProposals(tender.id);

        expect(proposals).toHaveLength(3);
    })

    test("Choose tender winner", async () => {
        const client = await UserRepository.create({
            name: "test",
            type: UserType.CLIENT
        });

        const participant = await UserRepository.create({
            name: "test",
            type: UserType.PARTICIPANT
        });

        const tender = await TenderRepository.create({
            budget: 1,
            ownerId: client.id,
            title: "Test",
        });

        await ProposalRepository.create({
            budget: 1,
            participantId: participant.id,
            tenderId: tender.id
        });

        const proposals = await TenderService.getProposals(tender.id);

        const report = await TenderService.chooseWinner(proposals[0].id);

        expect(report).toMatchObject({
            winnerId: proposals[0].id
        });

        await tender.reload();

        expect(tender.tenderStatus).toBe(TenderStatus.CLOSED);
    })
})
