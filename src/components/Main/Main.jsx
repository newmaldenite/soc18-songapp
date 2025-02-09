import { useState, useEffect } from 'react'
import { data } from '../../data/data';
import AddSongForm from "../Form/Form";
import VideoPlayerCard from "../VideoPlayer/videoplayer";
import SongList from "../SongList/SongList";
import { getVideos } from '../Helper/supabaseClient';

function Main() {
  // initialise state of videos with data imported from data.js
  const [ videos, setVideos ] = useState([]);
  // initialise state of currently selected video
  const [ currentVideo, setCurrentVideo ] = useState(null);

  function handleClickSongCard(e) {
    setCurrentVideo(e);
  }  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err) {
        console.error('Error loading videos:', err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main>
      <AddSongForm videos={videos} setVideos={setVideos}/>
      <SongList handleClickSongCard={handleClickSongCard} videos={videos} />
      <VideoPlayerCard currentVideo={videos[currentVideo]} />
    </main>
  );
}

export default Main;
