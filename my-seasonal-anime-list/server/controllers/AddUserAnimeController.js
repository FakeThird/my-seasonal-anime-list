import UserAnimeModel from "../models/UserAnimeModel.js";

async function addUserAnime(req, res) {
    try {
        const { title, watched, currentEp, status, rating, op, ed } = req.body;
        const newAnime = new UserAnimeModel({
            title: title,
            watched: Boolean(watched),
            currentEp: Number(currentEp),
            status,
            rating: Number(rating),
            op: Boolean(op),
            ed: Boolean(ed)
        });

        const savedAnime = await newAnime.save();
        console.log("Anime added successfully:", savedAnime);

        res.status(201).json({
            success: true,
            message: "Anime added successfully",
            anime: savedAnime
        });

    } catch (error) {
        console.error("Error adding anime:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error occurred while adding anime"
        });
    }
}

export default addUserAnime;