import UserAnimeModel from "../models/UserAnimeModel.js";

async function getAllAnimes(req, res) {
    try { 
        const animes = await UserAnimeModel.find();
        if (animes.length === 0) {
            return res.status(404).json({message: "No animes found"});
        }
        res.status(200).json({
            success: true,
            animes: animes
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server error occurred while fetching animes"
        });
    }
}

export default getAllAnimes;