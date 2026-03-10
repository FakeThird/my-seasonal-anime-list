import { useState, useEffect } from 'react'
import AddAnimeModal from "../components/AddAnimeModal";
import AnimeList from "../components/AnimeList";
import Header from "../components/ui/header/Header";

function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnimeList();
  }, []);

  async function fetchAnimeList() {
    try {
      const response = await fetch("http://localhost:3000/api/anime-list");
      const data = await response.json();
      setAnimeList(data.animes);
    } catch (error) {
      console.error("Error fetching anime list:", error);
    }
  }

  return (
    <main className="home-screen">
      <Header content="MyAnimeOpinions" />
      <AnimeList animeList={animeList} />
      <button className="add-anime-button" onClick={() => setShowModal(true)}>
        Add Anime
      </button>
      <AddAnimeModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onAddSuccess={fetchAnimeList}
      />
    </main>
  );
}

export default HomeScreen;