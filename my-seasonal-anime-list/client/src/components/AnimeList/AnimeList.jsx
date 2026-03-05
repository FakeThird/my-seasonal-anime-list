import UserListedAnime from "../UserListedAnime/UserListedAnime";

const animeList = [
  {
    title: "Attack on Titan",
    watched: "Yes",
    currentEp: 87,
    status: "Completed",
    rating: 10,
    op: "Guren no Yumiya",
    ed: "Utsukushiki Zankoku na Sekai"
  },
  {
    title: "Jujutsu Kaisen",
    watched: "Yes",
    currentEp: 47,
    status: "Watching",
    rating: 9,
    op: "Kaikai Kitan",
    ed: "Lost in Paradise"
  },
  {
    title: "Frieren: Beyond Journey's End",
    watched: "No",
    currentEp: 0,
    status: "Plan to Watch",
    rating: "N/A",
    op: "Yuusha",
    ed: "Anytime Anywhere"
  }
];


function AnimeList() {
  return (
  <table className='anime-list-component'>
    <thead>
        <tr>
            <th className="anime-list-labels">Anime Title</th>
            <th className="anime-list-labels">Watched</th>
            <th className="anime-list-labels">Progress</th>
            <th className="anime-list-labels">Rating</th>
            <th className="anime-list-labels">Status</th>
            <th className="anime-list-labels">OP</th>
            <th className="anime-list-labels">ED</th>
        </tr>
    </thead>
    <tbody>
      {animeList.map((anime, index) => (
        <UserListedAnime
          key={index}
          title={anime.title}
          watched={anime.watched}
          currentEp={anime.currentEp}
          status={anime.status}
          rating={anime.rating}
          op={anime.op}
          ed={anime.ed}
        />
      ))}
    </tbody>
  </table>
  );
}

export default AnimeList
