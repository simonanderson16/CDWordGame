import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useEffect, useState } from "react";
import Login from "./pages/Login.js";

function App() {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  return signedIn ? <Home /> : <Login />;
}

export default App;
