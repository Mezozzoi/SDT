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
import TenderUserModel from "./tender-user.model";

interface CreateTender {
    title: string;
    ownerId: number;
    budget: number;
    participants?: UserModel[];
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

    @BelongsToMany(() => UserModel, () => TenderUserModel)
    participants: UserModel[];

    @BeforeCreate
    static async beforeCreateHook(tender: TenderModel) {
        for (let participant of tender.participants || []) {
            await TenderUserModel.create({
                tenderId: tender.id,
                participantId: participant.id
            })
        }
    }
}

export default TenderModel;