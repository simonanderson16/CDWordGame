import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { PlusCircledIcon, ViewGridIcon, ExitIcon } from "@radix-ui/react-icons";

import { auth } from "../../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "../styles/Home.css";

const Home = () => {
  console.log(auth.currentUser.email);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Hoos Spelling: Admin Home</h1>
      <Button className="logout-button" onClick={handleLogout}>
        <ExitIcon className="mr-2 h-4 w-4" />
        Logout
      </Button>
      <div className="buttons-container">
        <Link to="/create">
          <Button className="homepage-button">
            <PlusCircledIcon className="mr-2 h-4 w-4" /> Create a Game
          </Button>
        </Link>
        <Link to="/games">
          <Button className="homepage-button" variant="outline">
            <ViewGridIcon className="mr-2 h-4 w-4" />
            All Games
          </Button>
        </Link>
      </div>
      <div>
        <p>Currently signed in as {auth.currentUser.email}</p>
      </div>
      <p className="made-for">Originally made for</p>
      <img src="cavDailyBanner.png" className="banner" />
      <p className="byline">
        Created by{" "}
        <a className="email-link" href="mailto:uhx8bu@virginia.edu">
          Simon Anderson
        </a>
      </p>
    </div>
  );
};

export default Home;
