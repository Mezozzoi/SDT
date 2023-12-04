import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import UserModel from "./user.model";
import TenderModel from "./tender.model";

export interface CreateProposal {
    participantId: number;
    tenderId: number;
    budget: number;
    description?: string;
}

@Table({
    tableName: "proposals"
})
class ProposalModel extends Model<ProposalModel, CreateProposal> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    participantId: number;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => TenderModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    tenderId: number;

    @BelongsTo(() => TenderModel)
    tender: TenderModel;

    @Column({type: DataType.DOUBLE, allowNull: false})
    budget: number;

    @Column({type: DataType.STRING, allowNull: true})
    description?: string;
}

export default ProposalModel;