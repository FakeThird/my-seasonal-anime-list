function SearchBar({ searchedAnime, setSearchedAnime }) {
    console.log(searchedAnime);
    return (
        <div className="search-anime-component">
            <input
                type="text"
                placeholder="Search Anime (Ex. Boku No Pico)"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const query = e.target.value.trim();
                        if (query.length < 3) return;
                        setSearchedAnime(query);
                    }
                }}
            />
        </div>
    );
}

export default SearchBar;