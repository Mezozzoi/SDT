import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import UserModel from "./user.model";
import TenderModel from "./tender.model";

export interface CreateTenderParticipant {
    participantId: number;
    tenderId: number;
}

@Table({
    tableName: "tenders_users"
})
class TenderParticipantModel extends Model<TenderParticipantModel, CreateTenderParticipant> {
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, primaryKey: true})
    participantId: number;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => TenderModel)
    @Column({type: DataType.INTEGER, primaryKey: true})
    tenderId: number;

    @BelongsTo(() => TenderModel)
    tender: TenderModel;
}

export default TenderParticipantModel;