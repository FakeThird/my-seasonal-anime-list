import { useEffect } from "react";
import { useState } from "react";
import AnimeResult from "../AnimeResult/AnimeResult";

function SearchResult() {
    const [animeListJSON, setAnimeListJSON] = useState([]);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const res = await fetch(`https://api.jikan.moe/v4/top/anime`);
                const json = await res.json();
                setAnimeListJSON(json.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchAnime();
    }, []);
    console.log(animeListJSON);
  return (
  <div className='search-result-component'>
    {animeListJSON.map((anime) => (
      <AnimeResult
        key={anime.mal_id}
        titleEN={anime.title_english}
        titleJP={anime.title}
        imgLink={anime.images.jpg.image_url}
        season={anime.season}
        year={anime.year}
        studio={anime.studios[0]?.name}
        score={anime.score}
      />
    ))}
  </div>
  );
}

export default SearchResult;
