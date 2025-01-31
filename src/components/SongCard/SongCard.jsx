import './SongCard.css';

function SongCard({ video, handleClickSongCard, i }) {

    return (
        <div className="song-card" onClick={() => handleClickSongCard(i)}>
            <p className='title'>{video.title}</p>
            <p className='artist'>{video.artist}</p>
            <p className='message'>"{video.message}"</p>
            <p className='username'><em>{video.username}</em></p>
        </div>
    );
}

export default SongCard;
