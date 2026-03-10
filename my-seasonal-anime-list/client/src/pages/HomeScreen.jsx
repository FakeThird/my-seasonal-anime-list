import { useState, useEffect } from 'react'
import AddAnimeModal from "../components/AddAnimeModal";
import EditAnimeModal from "../components/EditAnimeModal";
import AnimeList from "../components/AnimeList";
import Header from "../components/ui/header/Header";

function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnime, setEditAnime] = useState(null);
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

  function handleEdit(anime) {
    setEditAnime(anime);
    setShowEditModal(true);
  }

  async function handleDelete(anime) {
    if (window.confirm(`Are you sure you want to delete "${anime.title}"?`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete-anime/${anime._id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (response.ok && result.success) {
          alert('Anime deleted successfully');
          fetchAnimeList();
        } else {
          alert('Failed to delete anime: ' + (result.message || response.statusText));
        }
      } catch (error) {
        console.error('Error deleting anime:', error);
        alert('An error occurred while deleting anime');
      }
    }
  }

  return (
    <main className="home-screen">
      <Header content="MyAnimeOpinions" />
      <AnimeList animeList={animeList} onEdit={handleEdit} onDelete={handleDelete} />
      <button className="add-anime-button" onClick={() => setShowModal(true)}>
        Add Anime
      </button>
      <AddAnimeModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onAddSuccess={fetchAnimeList}
      />
      <EditAnimeModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        anime={editAnime}
        onEditSuccess={fetchAnimeList}
      />
    </main>
  );
}

export default HomeScreen;