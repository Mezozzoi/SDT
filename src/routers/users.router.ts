import {Router} from "express";
import UserModel from "../models/user.model";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    res.send(await UserModel.findAll());
});

export default usersRouter;