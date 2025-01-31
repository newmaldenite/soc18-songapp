import SongCard from '../SongCard/SongCard';
import { useState, useEffect } from "react";
// import './SongList.css';
import styles from './SongList.module.css'

function SongList({ videos, handleClickSongCard }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // New state for implementing shuffling
    const [cards, setCards] = useState(videos);

    useEffect(() => {
        setCards(videos);
      }, [videos]);

  // 1. Display the first three images in the array by default
  // 2. Display the next three images when the right arrow is clicked
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % videos.length);
  };
  // 3. Display the previous three images when the left arrow is clicked
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? videos.length - 3 : prevIndex - 3
    );
  };

  const displayedCards = cards.slice(currentIndex, currentIndex + 3);

  function shuffleArray() {
    let shuffledArray = [...cards]; // create a copy
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setCards(shuffledArray);
    setCurrentIndex(0);
  }

    return (
        <div>
        <h1 class="text-3xl font-bold underline h-100px">Number of songs: {videos.length}</h1>
        <button className={styles.shuffle} onClick={shuffleArray}>
          Shuffle
        </button>
        <div className={styles.carousel}>
          <button className={styles.arrowLeft} onClick={handlePrev}>
            {"<"}
          </button>
          <div className={styles.images}>
            {displayedCards.map((video, i) => (
              <SongCard
              i={i} 
              handleClickSongCard={handleClickSongCard} 
              video={video}
              />
            ))}
          </div>
          <button className={styles.arrowRight} onClick={handleNext}>
            {">"}
          </button>
        </div>
      </div>

        // <div className="song-list">
        // {videos.map((video, i) => (
        //     <SongCard i={i} handleClickSongCard={handleClickSongCard} video={video} />
        // ))}
        // </div>
    );
}

export default SongList;
