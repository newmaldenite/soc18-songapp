import { useState } from 'react'
import { data } from '../../data/data';
import AddSongForm from "../Form/Form";
import VideoPlayerCard from "../VideoPlayer/VideoPlayer";
import SongList from "../SongList/SongList";

function Main() {
  // initialise state of videos with data imported from data.js
  const [ videos, setVideos ] = useState(data);
  // initialise state of currently selected video
  const [ currentVideo, setCurrentVideo ] = useState(null);

  function handleClickSongCard(e) {
    // e.preventDefault();
    console.log(`before random: ${e}`);
    if (e === 0) {
      let randomSongIndex = Math.floor(Math.random() * (videos.length - 1)) + 1;
      setCurrentVideo(randomSongIndex);
      console.log(`random index: ${randomSongIndex}`);
      return;
    }
    console.log(`after random: ${e}`);
    setCurrentVideo(e);
  }  

  return (
    <main>
      <AddSongForm videos={videos} setVideos={setVideos}/> 
      <VideoPlayerCard currentVideo={videos[currentVideo]} />
      <SongList handleClickSongCard={handleClickSongCard} videos={videos} />
    </main>
  );
}

export default Main;
