import UserModel from "../models/user.model";
import BaseRepository from "./repository";

class UserRepository extends BaseRepository<UserModel> {
    constructor() {
        super(UserModel);
    }
}

export default new UserRepository();