// src/components/UserLogo/UserLogo.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../Helper/supabaseClient';

const UserLogo = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

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
    <div className="user-logo">
      <img src={profilePictureUrl} alt="User Profile" />
    </div>
  );
};

export default UserLogo;
