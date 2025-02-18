import styles from './UserLogo.module.css'
import { useEffect, useState } from "react";
import { Button } from "@mui/material"; 
import supabase from '../Helper/supabaseClient';

export default function UserLogo() {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Refresh page after logout
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout); // Toggle logout visibility when avatar is clicked
  };

  return (
    <div className={styles.UserLogo}>
      {user ? (
        <div className={styles.userInfo}>
          <img
            src={user.user_metadata?.avatar_url || "/default-avatar.png"}
            alt="User Avatar"
            className={styles.avatar}
            onClick={toggleLogout} // Toggle logout visibility on avatar click
          />
          {showLogout && ( // Show logout button when `showLogout` is true
            <Button
              className={styles.logoutButton}
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      ) : (
        <a href="/login" className={styles.loginLink}>
          Login
        </a>
      )}
    </div>
  );
}
