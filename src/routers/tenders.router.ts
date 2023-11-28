import {Router} from "express";
import TenderModel from "../models/tender.model";

const tendersRouter = Router();

tendersRouter.get("/", async (req, res) => {
    res.send(await TenderModel.findAll());
});

export default tendersRouter;