import { useEffect, useState, useRef, useCallback } from "react";
import AnimeResult from "../AnimeResult/AnimeResult";

const BASE = 'https://api.jikan.moe/v4';

function SearchResult({ onAnimeClick, searchedAnime }) {
    const [animeList, setAnimeList] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const pageRef = useRef(1);  
    const isLoadingRef = useRef(false);
    const lastCardRef = useRef(null);
    const isSearching = searchedAnime?.trim().length >= 3;

    const fetchAnime = useCallback(async (page) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        try {
            const res = await fetch(`${BASE}/top/anime?limit=5&page=${page}`);
            if (!res.ok) return;
            const json = await res.json();
            if (!json.data) return;
            setAnimeList(prev => page === 1 ? json.data : [...prev, ...json.data]);
            setHasNextPage(json.pagination?.has_next_page ?? false);
            pageRef.current = page;
        } catch (error) {
            console.error("Error:", error);
        } finally {
            isLoadingRef.current = false;
        }
    }, []);

    const searchAnime = useCallback(async (query, page) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        try {
            const res = await fetch(`${BASE}/anime?q=${encodeURIComponent(query)}&limit=5&page=${page}`);
            if (!res.ok) return;
            const json = await res.json();
            if (!json.data) return;
            setAnimeList(prev => page === 1 ? json.data : [...prev, ...json.data]);
            setHasNextPage(json.pagination?.has_next_page ?? false);
            pageRef.current = page;
        } catch (error) {
            console.error("Search Error:", error);
        } finally {
            isLoadingRef.current = false;
        }
    }, []);

    // Initial top anime fetch
    useEffect(() => {
        fetchAnime(1);
    }, []);

    // Trigger search when searchedAnime changes
    useEffect(() => {
        if (!isSearching) {
            // reset back to top anime when search is cleared
            pageRef.current = 1;
            fetchAnime(1);
            return;
        }
        pageRef.current = 1;
        searchAnime(searchedAnime.trim(), 1);
    }, [searchedAnime]);

    // Infinite scroll
    useEffect(() => {
        if (!lastCardRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isLoadingRef.current) {
                if (isSearching) {
                    searchAnime(searchedAnime.trim(), pageRef.current + 1);
                } else {
                    fetchAnime(pageRef.current + 1);
                }
            }
        });
        observer.observe(lastCardRef.current);
        return () => observer.disconnect();
    }, [animeList, hasNextPage, searchedAnime]);

    return (
        <div className='search-result-component'>
            {animeList.map((anime, index) => (
                <AnimeResult
                    key={anime.mal_id}
                    ref={index === animeList.length - 1 ? lastCardRef : null}
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