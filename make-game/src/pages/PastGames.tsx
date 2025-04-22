import { Game } from "../types.ts";
import { useEffect, useState } from "react";
import "../styles/Games.css";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";

const PastGames = ({
  allGames,
  getAllGames,
}: {
  allGames: Game[];
  getAllGames: () => void;
}) => {
  const [pastGames, setPastGames] = useState<Game[]>([]);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const fetchPastGames = () => {
    // Get the current time in UTC
    const nowUTC = new Date();

    // Convert the current time to EST by subtracting 5 hours
    const nowEST = new Date(
      nowUTC.getUTCFullYear(),
      nowUTC.getUTCMonth(),
      nowUTC.getUTCDate(),
      nowUTC.getUTCHours() - 5,
      nowUTC.getUTCMinutes(),
      nowUTC.getUTCSeconds(),
      nowUTC.getUTCMilliseconds()
    );
    const pastGames = allGames
      .filter((game) => {
        const toDate = new Date(game.dates.to);
        return toDate < nowEST;
      })
      .sort((a, b) => {
        const aToDate = new Date(a.dates.to);
        const bToDate = new Date(b.dates.to);
        return bToDate.getTime() - aToDate.getTime();
      });
    setPastGames(pastGames);
  };

  useEffect(() => {
    fetchPastGames();
  }, [allGames]);

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  const deleteGame = async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/.netlify/functions/deleteGame`,
      {
        data: { id },
      }
    );
    getAllGames();
    setOpenDialogId(null);
  };

  return (
    <div>
      {pastGames.length > 0 ? (
        <div>
          {pastGames.map((game, index) => (
            <div key={index} className="past-grid-container">
              <div className="past-grid">
                <div className="past-item-1 grid-item">
                  <p className="font-bold">Start Date</p>
                  <p className="white-box">
                    {formatDateString(game.dates.from)}
                  </p>
                </div>
                <div className="past-item-2 grid-item">
                  <p className="font-bold">End Date</p>
                  <p className="white-box">{formatDateString(game.dates.to)}</p>
                </div>
                <div className="past-item-3 grid-item">
                  <p className="font-bold">Required Letter</p>
                  <p className="white-box">{game.requiredLetter}</p>
                </div>
                <div className="past-item-4 grid-item">
                  <p className="font-bold">Additional Letters</p>
                  <p className="white-box">{game.availableLetters.join(" ")}</p>
                </div>
                <div className="past-item-5 grid-item">
                  <p className="font-bold">Answers</p>
                  <div className="scroll-answers">
                    {game.answers.map((answer: string, index: number) => (
                      <p key={index} className="white-box">
                        {answer}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="white-box mt-3">{game.plays} Total Plays</p>
                <Dialog
                  open={openDialogId === game.id}
                  onOpenChange={(isOpen) =>
                    setOpenDialogId(isOpen ? game.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="delete-game-button"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Game?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the game that took place from{" "}
                        {formatDateString(game.dates.from)} to{" "}
                        {formatDateString(game.dates.to)}.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant="destructive"
                      className="delete-game-button"
                      onClick={() => {
                        deleteGame(game.id);
                      }}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" /> Confirm Delete
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No past games found</h2>
      )}
    </div>
  );
};

export default PastGames;
