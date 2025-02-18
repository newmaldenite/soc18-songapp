import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import UserLogo from './components/UserLogo/UserLogo';
import { useState, useEffect } from 'react'
import supabase from './components/Helper/supabaseClient';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="auth-container">
        <Auth 
          supabaseClient={supabase}
          providers={["github"]}
          appearance={{ theme: ThemeSupa }}
          className="auth"
        />
      </div>
    )
  }

  return (
    <>
      <UserLogo />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
