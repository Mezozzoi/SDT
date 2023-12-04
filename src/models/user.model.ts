import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import TenderModel from "./tender.model";
import ProposalModel from "./proposal.model";

export enum UserType {
    ADMIN = "admin",
    PARTICIPANT = "participant",
    CLIENT = "client"
}

interface UserModelCreate {
    name: string;
    type: UserType;
}

@Table({
    tableName: "users",
    timestamps: true
})
class UserModel extends Model<UserModel, UserModelCreate> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.ENUM({values: Object.values(UserType)}), allowNull: false })
    type: UserType;

    @HasMany(() => TenderModel, "ownerId")
    tenders: TenderModel;

    @BelongsToMany(() => TenderModel, () => ProposalModel)
    participated: TenderModel[];
}

export default UserModel;