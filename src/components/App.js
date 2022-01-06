import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName
    });
  }

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>) : ("initializing..")}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
