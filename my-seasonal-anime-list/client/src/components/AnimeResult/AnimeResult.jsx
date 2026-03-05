function AnimeResult({titleEN, titleJP, imgLink, season, year, studio, score})   {
    const seasonDisplay = (season && year) ? `${season} ${year}` : 'Unknown';
    const studioDisplay = studio ?? 'Unknown';

    return(
        <div className="anime-list-result">
            <p style={{
                backgroundImage: `url(${imgLink})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "200px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
            }}
            ></p>
            <h2>{titleJP}</h2>
            <p>{titleEN}</p>
            <p>Season: {seasonDisplay}</p>
            <p>Studio: {studioDisplay}</p>
            <p>Score: {score}</p>
        </div>
    );
}

export default AnimeResult;
