import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  PlusCircledIcon,
  ViewGridIcon,
  ExitIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

import { auth } from "../../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "../styles/Home.css";
import ChangePassword from "./ChangePassword.js";
import AddNewUser from "./AddNewUser.js";

const Home = () => {
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
      <Button
        variant="destructive"
        className="logout-button"
        onClick={handleLogout}
      >
        <ExitIcon className="mr-2 h-4 w-4" />
        Logout
      </Button>
      <div className="mock-card">
        <h2 className="card-header">Game Management</h2>
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
      <div className="mock-card">
        <h2 className="card-header">User Management</h2>
        <p>Currently signed in as:</p>
        <Badge variant="outline" className="mb-3">
          {auth.currentUser.email}
        </Badge>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="homepage-button">
              <Pencil1Icon className="mr-2 h-4 w-4" />
              Change my Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ChangePassword />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="homepage-button">
              <PersonIcon className="mr-2 h-4 w-4" />
              Add a New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddNewUser />
          </DialogContent>
        </Dialog>
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
