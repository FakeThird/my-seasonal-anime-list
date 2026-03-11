async function main() {
    /* FIELDS */
    const gallery = document.querySelector('.anime-gallery');
    const searchBar = document.querySelector('.search-bar');
    const tableBody = document.querySelector('tbody');

    const BASE = 'https://api.jikan.moe/v4';

    let currentPage = 1;
    let currentQuery = '';
    let isSearching = false;
    let isLoading = false;
    let hasNextPage = true;

    // Static array acting as the "database"
    // Remove after implementation
    let myList = [];

    // Retrieves Anime List from API
    async function fetchAnime(page = 1) {
        if (isLoading) return;
        isLoading = true;
        try {
            const res = await fetch(`${BASE}/top/anime?limit=5&page=${page}`);
            const json = await res.json();
            if (page === 1) gallery.innerHTML = '';
            displayAnime(json.data);
            hasNextPage = json.pagination.has_next_page;
            observeLastCard();
        } catch (error) {
            console.error("Error:", error);
        }
        isLoading = false;
    }

    // Displays the Anime in the Frontend
    function displayAnime(animeList) {
        if (!gallery) return;

        for (let anime of animeList) {
            const newTab = document.createElement('figure');

            const image = document.createElement('div');
            image.className = "image";
            image.style.backgroundImage = `url("${anime.images.jpg.image_url}")`;

            const description = document.createElement('div');
            description.className = "description";
            const season = (anime.season && anime.year) ? `${anime.season} ${anime.year}` : 'Unknown';
            const studio = anime.studios[0]?.name ?? 'Unknown';
            description.innerHTML = `
                <div class="title">${anime.title}</div>
                <p>${anime.title_english ?? ''}</p>
                <div class="layer light"><span>SEASON:</span> ${season}</div>
                <div class="layer"><span>STUDIO:</span> ${studio}</div>
                <div class="layer light"><span>SCORE:</span> ${anime.score}</div>
            `;

            newTab.append(image);
            newTab.append(description);
            newTab.addEventListener('click', () => addToTable(anime));
            gallery.append(newTab);
        }
    }   

    // Due to API Limits observer acts as loader when reaching bottom of current list
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
            currentPage++;
            if (isSearching) {
                searchAnime(currentQuery, currentPage);
            } else {
                fetchAnime(currentPage);
            }
        }
    });

    // Checks if its the last figure to load more Anime
    function observeLastCard() {
        const cards = gallery.querySelectorAll('figure');
        if (cards.length === 0) return;
        observer.disconnect();
        observer.observe(cards[cards.length - 1]);
    }

    // Dynamic searching for anime 
    async function searchAnime(query, page = 1) {
        if (isLoading) return;
        isLoading = true;
        try {
            const res = await fetch(`${BASE}/anime?q=${encodeURIComponent(query)}&limit=25&page=${page}`);
            const json = await res.json();
            if (page === 1) gallery.innerHTML = '';
            displayAnime(json.data);
            hasNextPage = json.pagination.has_next_page;
            observeLastCard();
        } catch (error) {
            console.error("Search Error:", error);
        }
        isLoading = false;
    }

    searchBar.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchBar.value.trim();
            if (query.length < 3) return;
            currentPage = 1;
            currentQuery = query;
            isSearching = true;
            searchAnime(query, 1);
        }
    });


    // Database handling for adding
    function addToTable(anime) {
        if (myList.find(t => t.id === anime.mal_id)) {
            console.warn(`${anime.title} is already in the list`);
            return;
        }

        const season = (anime.season && anime.year) ? `${anime.season} ${anime.year}` : 'Unknown';
        const studio = anime.studios[0]?.name ?? 'Unknown';

        const animeData = {
            id: anime.mal_id,
            title: anime.title,
            title_english: anime.title_english ?? '',
            score: anime.score,
            season,
            studio,
        };

        myList.push(animeData);
        renderRow(animeData);
    }

    function renderRow(animeInfo) {
        const row = `
            <tr class="task-row" data-id="${animeInfo.id}">
                <td class="col-title">${animeInfo.title}</td>
                <td class="col-watched">
                    <span class="checkbox-icon fa-regular fa-square" data-type="watched"></span>
                </td>
                <td class="col-episode">—</td>
                <td class="col-status">—</td>
                <td class="col-rating">—</td>
                <td class="col-op">
                    <span class="checkbox-icon fa-regular fa-square" data-type="op"></span>
                </td>
                <td class="col-ed">
                    <span class="checkbox-icon fa-regular fa-square" data-type="ed"></span>
                </td>
                <td class="col-utils">
                    <span class="fa-solid fa-trash delete-btn"></span>
                </td>
            </tr>
        `;
        
        tableBody.insertAdjacentHTML('beforeend', row);

        const newRow = tableBody.querySelector(`tr[data-id="${animeInfo.id}"]`);

        newRow.querySelectorAll('.checkbox-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const checked = icon.classList.contains('fa-solid');
                icon.classList.toggle('fa-solid', !checked);
                icon.classList.toggle('fa-regular', checked);
                icon.classList.toggle('fa-square-check', !checked);
                icon.classList.toggle('fa-square', checked);
            });
        });

        newRow.querySelector('.delete-btn').addEventListener('click', () => deleteRow(animeInfo.id));
    }

    function deleteRow(id) {
        myList = myList.filter(t => t.id !== id);
        tableBody.querySelector(`tr[data-id="${id}"]`).remove();
    }

    fetchAnime();
}

main()