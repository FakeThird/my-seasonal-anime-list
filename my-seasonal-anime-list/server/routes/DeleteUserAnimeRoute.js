import express from "express";
import deleteUserAnime from "../controllers/DeleteUserAnimeController.js";

const deleteUserAnimeRouter = express.Router();
deleteUserAnimeRouter.delete("/delete-anime/:id", deleteUserAnime);

export default deleteUserAnimeRouter;