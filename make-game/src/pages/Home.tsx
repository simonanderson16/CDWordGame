import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { PlusCircledIcon, ViewGridIcon } from "@radix-ui/react-icons";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Hoos Spelling: Admin Home</h1>

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
