import {Sequelize} from "sequelize-typescript";
import {Transaction} from "sequelize";

export default class UnitOfWork {
    private sequelize: Sequelize
    private transaction: Transaction;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    async begin() {
        this.transaction = await this.sequelize.transaction();
    }

    async rollback() {
        await this.transaction.rollback();
    }

    async commit() {
        await this.transaction.commit();
    }
}