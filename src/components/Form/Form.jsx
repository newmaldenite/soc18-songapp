import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddSongForm({ videos, setVideos }) {
    const [form, setForm] = useState({
        artist: "",
        title: "",
        url: "",
        message: "",
        username: "",
      });
    
      function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        console.log(form);
        const newSong = { id: videos.length + 1, ...form }; // 
        console.log(newSong);
    // onAddSong(newSong); - wasn't sure what this line was for?
    setVideos(prevVideos => [...prevVideos, newSong]); // add the newSong to videos, also changed it to a functional update 
    setForm({ artist: "", title: "", url: "", message: "", username: "" }); // Reset form
  }
      
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="add-song-form"
      sx={{ '& .MuiTextField-root': { 
        m: 1, 
        width: '35ch',
        backgroundColor: '#f5f5f5'
       } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="username"
          name="username" // ✅ Add name
          label="Your name"
          type="text"
          variant="filled"
          value={form.username} // ✅ Make it controlled by React
          onChange={handleChange} // ✅ Handle change
        />
        
        <TextField
          id="title"
          name="title"
          label="Song name"
          type="text"
          variant="filled"
          value={form.title}
          onChange={handleChange}
        />
        
        <TextField
          id="artist"
          name="artist"
          label="Artist"
          type="text"
          variant="filled"
          value={form.artist}
          onChange={handleChange}
        />
        
        <TextField
          required
          id="url"
          name="url"
          label="YouTube URL"
          type="text"
          variant="filled"
          value={form.url}
          onChange={handleChange}
        />
        
        <TextField
          id="message"
          name="message"
          label="Your message"
          type="text"
          variant="filled"
          value={form.message}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <TextField
        required
          id="filled-required"
          label="Your name"
          type="input"
          variant="filled"
        />
        
        <TextField
          id="filled-required"
          label="Song name"
          type="input"
          variant="filled"
        
        />
        <TextField
          id="filled-required"
          label="Artist"
          type="input"
          variant="filled"
          
        />
        <TextField
          required
          id="filled-required"
          label="YouTube URL"
          type="input"
          variant="filled"
          
        />
        <TextField
          id="filled-required"
          label="Your message:"
          type="input"
          variant="filled"

        />
      </div> */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Song
      </Button>

    </Box>
  );
}