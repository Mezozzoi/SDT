import UserRepository from "./repositories/user.repository";
import {UserType} from "./models/user.model";
import TenderRepository from "./repositories/tender.repository";
import ProposalRepository from "./repositories/proposal.repository";

export default async function seed() {

    const client = await UserRepository.create({
        name: "Stepan",
        type: UserType.CLIENT
    });

    const participant = await UserRepository.create({
        name: "Bob",
        type: UserType.PARTICIPANT
    });

    const tender = await TenderRepository.create({
        budget: 1,
        ownerId: client.id,
        title: "Nuke",
    });

    await ProposalRepository.create({
        budget: 1,
        participantId: participant.id,
        tenderId: tender.id
    });
}