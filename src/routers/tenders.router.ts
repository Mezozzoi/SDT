import {Request, Router} from "express";
import TenderModel from "../models/tender.model";
import TenderService from "../services/tender.service";
import ChooseWinnerDto from "./dtos/choose-winner.dto";
import BodyValidatorMiddleware from "../middlewares/body-validator.middleware";

const tendersRouter = Router();

tendersRouter.get("/", async (req, res) => {
    res.send(await TenderModel.findAll());
});

tendersRouter.post("/chooseWinner", BodyValidatorMiddleware(ChooseWinnerDto), async (req: Request<any, any, ChooseWinnerDto>, res, next) => {
    res.send(await TenderService.chooseWinner(req.body.proposalId));
});

export default tendersRouter;