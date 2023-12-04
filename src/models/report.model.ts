import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import ProposalModel from "./proposal.model";

interface CreateReport {
    winnerId: number;
}

@Table({
    tableName: "reports",
    timestamps: true
})
class ReportModel extends Model<ReportModel, CreateReport> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => ProposalModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    winnerId: number;

    @BelongsTo(() => ProposalModel)
    winner: ProposalModel;
}

export default ReportModel;