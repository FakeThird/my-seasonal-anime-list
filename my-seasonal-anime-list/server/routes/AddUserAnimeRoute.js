import express from "express";
import addUserAnime from "../controllers/AddUserAnimeController.js";

const addUserAnimeRouter = express.Router();
addUserAnimeRouter.post("/add-anime", addUserAnime);

export default addUserAnimeRouter;