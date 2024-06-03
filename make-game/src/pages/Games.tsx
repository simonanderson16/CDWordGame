import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import "../styles/Games.css";

const Games = () => {
  return (
    <div className="games-container">
      <h1 className="header">Hoos Spelling: All Games</h1>
      <Link to="/">
        <Button className="home-button">
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      {/* filter by past, today, and upcoming (only should be able to edit upcoming) */}
      <Card className="games-card">
        <CardHeader>
          <CardDescription>
            This card will contain info about all games that have already been
            created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          You will be able to filter by past, today, and upcoming, with the
          ability to edit upcoming games.
        </CardContent>
      </Card>
    </div>
  );
};

export default Games;
