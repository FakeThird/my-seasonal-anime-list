function UserListedAnime({title, watched, currentEp, status, rating, op, ed})   {
    return(
        <tr className="user-listed-anime-container">
            <td></td>
            <td>{title}</td>
            <td>{watched}</td>
            <td>{currentEp}</td>
            <td>{status}</td>
            <td>{rating}</td>
            <td>{op}</td>
            <td>{ed}</td>
        </tr>
    );
}

export default UserListedAnime;

