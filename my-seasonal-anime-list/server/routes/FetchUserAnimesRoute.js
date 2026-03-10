import express from "express";
import getAllAnimes from "../controllers/FetchUserAnimesController.js";

const userAnimeRouter = express.Router();
userAnimeRouter.get("/anime-list", getAllAnimes);

export default userAnimeRouter;