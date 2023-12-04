import {DestroyOptions, CreationAttributes, FindOptions} from "sequelize";
import {Model, ModelCtor} from "sequelize-typescript";
import e from "express";

export interface Repository<T extends Model> {
    findOne(options?: FindOptions<T>): Promise<T | null>;
    findAll(options?: FindOptions<T>): Promise<T[]>;
    findByPk(id: number): Promise<T | null>;
    create(data: CreationAttributes<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(options: DestroyOptions): Promise<number>;
}

export default abstract class BaseRepository<T extends Model> implements Repository<T> {
    protected constructor(protected model: ModelCtor<T>) {}

    async findOne(options?: FindOptions<T>): Promise<T | null> {
        return await this.model.findOne(options);
    }

    async findAll(options?: FindOptions<T>): Promise<T[]> {
        return await this.model.findAll(options);
    }

    async findByPk(id: number | string): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async create(data: CreationAttributes<T>): Promise<T> {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const entity = await this.findByPk(id);
        if (entity) {
            await entity.update(data);
            return entity;
        }
        return null;
    }

    async delete(options: DestroyOptions): Promise<number> {
        return this.model.destroy(options);
    }
}