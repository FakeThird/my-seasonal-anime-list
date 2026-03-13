import { useState, useEffect } from 'react'
import AddAnimeModal from "../components/AddAnimeModal";
import EditAnimeModal from "../components/EditAnimeModal";
import DeleteAnimeModal from "../components/DeleteAnimeModal";
import AnimeList from "../components/AnimeList";
import Header from "../components/ui/header/Header";
import SearchAnime from '../components/SearchAnime';
import Toast from '../components/ui/toast/Toast';
import './HomeScreen.css'

function HomeScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editAnime, setEditAnime] = useState(null);
  const [deleteAnime, setDeleteAnime] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
 
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

  function handleDelete(anime) {
    setDeleteAnime(anime);
    setShowDeleteModal(true);
  }

  function handleAnimeSelect(anime) {
    setSelectedAnime(anime);
    setShowAddModal(true);
  }

  function showToast(message) {
    setToastMessage(message);
  }

  function handleAddSuccess(newAnime) {
    fetchAnimeList();
    showToast(`Added "${newAnime.title}"`);
  }

  function handleEditSuccess(updatedAnime) {
    fetchAnimeList();
    showToast(`Updated "${updatedAnime.title}"`);
  }

  // used when a checkbox is toggled in the list
  async function handleToggle(anime, field, value) {
    try {
      // create updated object by merging changed field
      const updated = { ...anime, [field]: value };
      const response = await fetch(`http://localhost:3000/api/update-anime/${anime._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        // refresh the list (could also optimistically update state instead)
        fetchAnimeList();
        showToast(`Updated "${result.anime.title}"`);
      } else {
        console.error('Toggle update failed:', result.message || response.statusText);
      }
    } catch (err) {
      console.error('Error toggling field:', err);
    }
  }

  function handleDeleteSuccess() {
    console.log('handleDeleteSuccess called');
    fetchAnimeList();
    showToast('Anime deleted successfully');
  }

  const filteredAnimeList = statusFilter === 'All' 
    ? animeList 
    : animeList.filter(anime => anime.status === statusFilter);

  return (
    <main className="home-screen">
      <Header content="MyAnimeOpinions" />
      
      <div className="content-container">
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}        
        <div className="search-section">
          <SearchAnime onAnimeClick={handleAnimeSelect}/>
        </div>
        
        <div className="list-section">
          <div className="filter-container">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select 
              id="status-filter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
          
          <AnimeList
            animeList={filteredAnimeList}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
      </div>
    
      <AddAnimeModal
        isVisible={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedAnime(null);
        }}
        onAddSuccess={handleAddSuccess}
        selectedAnime={selectedAnime}
        animeList={animeList}
        showToast={showToast}
      />
      <EditAnimeModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        anime={editAnime}
        onEditSuccess={handleEditSuccess}
      />
      <DeleteAnimeModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        anime={deleteAnime}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </main>
  );
}

export default HomeScreen;