import {expect, test} from "@jest/globals";
import TenderModel from "../src/models/tender.model";
import UserModel, {UserType} from "../src/models/user.model";
import sequelize from "../src/sequelize";
import TenderUserModel from "../src/models/tender-user.model";
sequelize;

test("find all participants", async () => {
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

    await TenderUserModel.create({
        tenderId: tenderId,
        participantId: participant1.id
    })

    await TenderUserModel.create({
        tenderId: tenderId,
        participantId: participant2.id
    })

    const participants = (await TenderModel.findByPk(tenderId, {
        include: {model: UserModel, as: "participants"}
    }))?.participants;

    expect(participants).toHaveLength(2);
})