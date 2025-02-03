import SongCard from '../SongCard/SongCard';
import { useState, useEffect, useRef } from "react";
// import './SongList.css';
import styles from './SongList.module.css'
import { motion, useScroll } from "motion/react"
import { Button } from '@mui/material';

function SongList({ videos, handleClickSongCard }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });

    const displayedCards = [...videos];

    // Function to generate a random index
    const handleLuckyClick = () => {
        const randomIndex = Math.floor(Math.random() * displayedCards.length);
        handleClickSongCard(randomIndex); // Pass the random index up
    };

    // Handle mouse wheel event to scroll the container
    const handleWheel = (event) => {
      // Prevent the default scroll behavior (vertical scrolling)
      event.preventDefault();

      if (ref.current) {
          // Scroll horizontally when mouse wheel is detected
          if (event.deltaY !== 0) {
              ref.current.scrollLeft += event.deltaY;
          }
      }
  };

  // Attach wheel event listener when component is mounted
  useEffect(() => {
      const scrollContainer = ref.current;
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
          scrollContainer.removeEventListener('wheel', handleWheel);
      };
  }, []);

    // New state for implementing shuffling
    // const [cards, setCards] = useState(videos);

    // useEffect(() => {
    //     setCards(videos);
    //   }, [videos]);

  // 1. Display the first three images in the array by default
  // 2. Display the next three images when the right arrow is clicked
  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 3) % videos.length);
  // };
  // // 3. Display the previous three images when the left arrow is clicked
  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 3 < 0 ? videos.length - 3 : prevIndex - 3
  //   );
  // };

  // const displayedCards = cards.slice(currentIndex, currentIndex + 3);

  // function shuffleArray() {
  //   let shuffledArray = [...cards]; // create a copy
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [
  //       shuffledArray[j],
  //       shuffledArray[i],
  //     ];
  //   }
  //   setCards(shuffledArray);
  //   setCurrentIndex(0);
  // }

    return (
        <div>
        {/* <h1 class="text-3xl font-bold underline h-100px">Number of songs: {videos.length}</h1> */}
        {/* <button className={styles.shuffle} onClick={shuffleArray}>
          Shuffle
        </button> */}
        {/* <div className={styles.carousel}>
          <button className={styles.arrowLeft} onClick={handlePrev}>
            {"<"}
          </button>
          <div className={styles.images}>
            {displayedCards.map((video, i) => (
              <SongCard
              i={currentIndex + i} 
              handleClickSongCard={handleClickSongCard} 
              video={video}
              />
            ))}
          </div>
          <button className={styles.arrowRight} onClick={handleNext}>
            {">"}
          </button>
        </div> */}
        
            {/* Progress Indicator */}
            <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className={styles.bg} />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    className={styles.indicator}
                    style={{ pathLength: scrollXProgress }}
                />
            </svg>


            {/* Scrollable Container */}
            <div className={styles.scrollContainer} ref={ref}>
                <motion.ul className={styles.scrollContent}>
                    {videos.map((video, i) => (
                        <li key={i}>
                            <SongCard 
                            i={currentIndex + i} 
                            handleClickSongCard={handleClickSongCard} 
                            video={video} />
                        </li>
                    ))}
                </motion.ul>
            </div>

            
            <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        marginLeft: 2, // spacing from the progress circle
                        height: '40px', // optional: control the button height
                    }}
                    onClick={handleLuckyClick} // Trigger the lucky click action
                >
                    I'm feeling lucky!
                </Button>

      </div>

        // <div className="song-list">
        // {videos.map((video, i) => (
        //     <SongCard i={i} handleClickSongCard={handleClickSongCard} video={video} />
        // ))}
        // </div>
    );
}


export default SongList;
