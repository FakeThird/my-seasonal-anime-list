import AnimeList from "../components/AnimeList";
import Header from "../components/Header";

function HomeScreen() {
  return (
    <main className="home-screen">
        <Header content="MyAnimeOpinions"/>
        <AnimeList/>
    </main>
    
  );
}

export default HomeScreen;