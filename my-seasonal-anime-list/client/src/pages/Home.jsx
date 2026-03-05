import Header from "../components/Header/Header";
import { useState } from "react";

import SearchBar from "../components/SearchBar/Searchbar";
import SearchResult from "../components/SearchResult/SearchResult";
import AnimeList from "../components/AnimeList/AnimeList";


function HomePage() {
    const [searchedAnime, setSearchedAnime] = useState(""); 

    return (
    <main className="home-page">
            <Header/>
            <SearchBar
                searchedAnime={searchedAnime}
                setSearchedAnime={setSearchedAnime}
            />
            <SearchResult searchedAnime={searchedAnime}/>
            <AnimeList/>
    </main>
    );
}

export default HomePage;