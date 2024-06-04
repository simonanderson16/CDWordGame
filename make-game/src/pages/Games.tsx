import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import "../styles/Games.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import TodaysGame from "./TodaysGame.js";
import PastGames from "./PastGames.js";
import { Game } from "../types.ts";
import FutureGames from "./FutureGames.tsx";

const Games = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("today");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [totalPlays, setTotalPlays] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const findTotalPlays = (games: Game[]) => {
    let sum = 0;
    games.forEach((game) => (sum += game.plays));
    setTotalPlays(sum);
  };

  const getAllGames = async () => {
    const response = await axios.get("http://localhost:8888/create");
    setAllGames(response.data);
    findTotalPlays(response.data);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="games-container">
      <h1 className="games-header">Hoos Spelling: All Games</h1>
      <h2 className="games-subheader white-box mb-3">{totalPlays} All-Time Plays</h2>
      <Link to="/">
        <Button className="home-button">
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Tabs
        defaultValue="today"
        className="tabs mb-5"
        value={tab}
        onValueChange={onTabChange}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="past">Past Games</TabsTrigger>
          <TabsTrigger value="today">Today's Game</TabsTrigger>
          <TabsTrigger value="future">Future Games</TabsTrigger>
        </TabsList>
        <TabsContent value="past">
          <Card className="games-card scrollable-card">
            <CardHeader>
              <CardDescription>
                All of the following games have already ended. You can delete
                each one you would no longer like to store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PastGames allGames={allGames} getAllGames={getAllGames} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="today">
          <Card className="games-card">
            <CardHeader>
              <CardDescription>
                The following game is currently active. You will not be able to
                delete it until it is no longer live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TodaysGame allGames={allGames} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="future">
          <Card className="games-card scrollable-card">
            <CardHeader>
              <CardDescription>
                All of the following games have been created but not yet
                released. You can delete any of these games.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FutureGames allGames={allGames} getAllGames={getAllGames} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Games;
