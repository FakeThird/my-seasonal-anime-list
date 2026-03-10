import express from "express";
import updateUserAnime from "../controllers/UpdateUserAnimeController.js";

const updateUserAnimeRouter = express.Router();
updateUserAnimeRouter.put("/update-anime/:id", updateUserAnime);

export default updateUserAnimeRouter;