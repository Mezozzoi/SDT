import {Router} from "express";
import tendersRouter from "./tenders.router";
import usersRouter from "./users.router";

const router = Router();

router.use("/users", usersRouter);
router.use("/tender", tendersRouter);

router.use("*", (req, res) => {
    res.sendStatus(404);
});

export default router;