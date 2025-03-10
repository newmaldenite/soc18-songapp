// src/components/UserLogo/UserLogo.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../Helper/supabaseClient';

const UserLogo = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile picture:', error);
        } else {
          setProfilePictureUrl(data.avatar_url);
        }
      }
    };

    fetchProfilePicture();
  }, []);

  if (!profilePictureUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-logo">
      <img src={profilePictureUrl} alt="User Profile" />
    </div>
  );
};

export default UserLogo;
