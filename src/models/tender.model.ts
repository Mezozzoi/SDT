import {
    BeforeCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import UserModel from "./user.model";
import ProposalModel from "./proposal.model";

interface CreateTender {
    title: string;
    ownerId: number;
    budget: number;
    scheduledOn?: Date;
    tenderStatus?: TenderStatus;
}

export enum TenderStatus {
    SCHEDULED = "scheduled",
    OPEN = "open",
    CLOSED = "closed"
}

@Table({
    tableName: "tenders",
    timestamps: true,
})
class TenderModel extends Model<TenderModel, CreateTender> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    budget: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    ownerId: number;

    @BelongsTo(() => UserModel)
    owner: UserModel;

    @BelongsToMany(() => UserModel, () => ProposalModel)
    participants: UserModel[];

    @Column({type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW})
    scheduledOn: Date;

    @Column({
        type: DataType.ENUM({values: Object.values(TenderStatus)}),
        allowNull: false, defaultValue: TenderStatus.OPEN
    })
    tenderStatus: TenderStatus;
}

export default TenderModel;