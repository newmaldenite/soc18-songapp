// src/components/UserLogo/UserLogo.jsx
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../Helper/supabaseClient';
import './UserLogo.css';

const UserLogo = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
    setIsMenuOpen(false);
    // Optional: Redirect to login page or update state
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      // Updated authentication method
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {

        const githubAvatar = user.user_metadata?.avatar_url;

        if (!githubAvatar) {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();

          if (!error) setProfilePictureUrl(data.avatar_url);
        } else {
          setProfilePictureUrl(githubAvatar);
        }
      }
    };

    fetchProfilePicture();
  }, []);

  if (!profilePictureUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="user-menu-button"
      >
        <img 
          src={profilePictureUrl || '/default-avatar.png'} 
          alt="User Profile"
          className="user-avatar"
        />
      </button>
  
      {isMenuOpen && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <p>Signed in as</p>
            <p className="user-email">{supabase.auth.user()?.email}</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="dropdown-item"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLogo;
