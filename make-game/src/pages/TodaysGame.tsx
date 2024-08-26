import { useEffect, useState } from "react";
import { Game } from "../types.ts";
import { Button } from "@/components/ui/button.tsx";
import { TrashIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

const TodaysGame = ({ allGames, getAllGames }: { allGames: Game[]; getAllGames: () => void }) => {
    const [todaysGame, setTodaysGame] = useState<Game>();

    useEffect(() => {
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
        const gameForToday = allGames.find((game) => {
            const fromDate = new Date(game.dates.from);
            const toDate = new Date(game.dates.to);
            return fromDate <= nowEST && toDate >= nowEST;
        });
        setTodaysGame(gameForToday);
    }, [allGames]);

    const formatDateString = (dateString: string, isEndDate: boolean) => {
        const date = new Date(dateString);
        if (isEndDate) {
            date.setDate(date.getDate() - 1);
        }
        return date.toDateString();
    };

    const deleteGame = async (id: string) => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/create/${id}`);
        getAllGames();
    };

    return (
        <div>
            {todaysGame ? (
                <div>
                    <div className="flex justify-between">
                        <h2 className="white-box">{todaysGame.plays} Total Plays</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    <TrashIcon className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Game?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the current game and people will no longer be able to play
                                        it. It is advised that you reserve this action for games that contain errors.
                                    </DialogDescription>
                                </DialogHeader>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        deleteGame(todaysGame.id);
                                    }}
                                >
                                    <TrashIcon className="mr-2 h-4 w-4" /> Confirm Delete
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="today-grid">
                        <div className="grid-item-1 grid-item">
                            <p className="font-bold">Available Until</p>
                            <p className="white-box">{formatDateString(todaysGame.dates.to, true)}</p>
                        </div>
                        <div className="grid-item-2 grid-item">
                            <p className="font-bold">Required Letter</p>
                            <p className="white-box">{todaysGame.requiredLetter}</p>
                        </div>
                        <div className="grid-item-3 grid-item">
                            <p className="font-bold">Additional Letters</p>
                            <p className="white-box">{todaysGame.availableLetters.join(" ")}</p>
                        </div>
                        <div className="grid-item-4 grid-item">
                            <p className="font-bold">Answers</p>
                            <div className="todays-answers">
                                {todaysGame.answers.map((answer: string, index: number) => (
                                    <p key={index} className="white-box">
                                        {answer}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>No game today</h2>
            )}
        </div>
    );
};

export default TodaysGame;
