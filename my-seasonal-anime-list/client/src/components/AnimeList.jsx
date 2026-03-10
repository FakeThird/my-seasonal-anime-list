import { useState, useEffect } from "react";

function AnimeList({ animeList }) {

    console.log(animeList);
    return (
        <table className="anime-list-component">
            <thead>
                <tr>
                    <th className="label">Anime Title</th>
                    <th className="label">Watched</th>
                    <th className="label">Current Episode</th>
                    <th className="label">Status</th>
                    <th className="label">Rating</th>
                    <th className="label">OP</th>
                    <th className="label">ED</th>
                    <th className="label">Actions</th>
                </tr>
            </thead>
            <tbody>
                {animeList.map((anime) => (
                    <tr key={anime._id} className="anime-row">
                        <td className="label">{anime.title}</td>
                        <td className="label">{anime.watched ? "Yes" : "No"}</td>
                        <td className="label">{anime.currentEp}</td>
                        <td className="label">{anime.status}</td>
                        <td className="label">{anime.rating}</td>
                        <td className="label">{String(anime.op)}</td>
                        <td className="label">{String(anime.ed)}</td>
                        <td className="label">
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>))}
            </tbody>
        </table>
    )    
}

export default AnimeList;