import { Game } from "../types.ts";
import { useEffect, useState } from "react";
import "../styles/Games.css";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";

const FutureGames = ({ allGames, getAllGames }: { allGames: Game[]; getAllGames: () => void }) => {
    const [futureGames, setFutureGames] = useState<Game[]>([]);
    const [openDialogId, setOpenDialogId] = useState<string | null>(null);

    const fetchFutureGames = () => {
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
        const futureGames = allGames
            .filter((game) => {
                const fromDate = new Date(game.dates.from);
                return fromDate > nowEST;
            })
            .sort((a, b) => {
                const aToDate = new Date(a.dates.to);
                const bToDate = new Date(b.dates.to);
                return aToDate.getTime() - bToDate.getTime();
            });
        setFutureGames(futureGames);
    };

    useEffect(() => {
        fetchFutureGames();
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
        setOpenDialogId(null);
    };

    return (
        <div>
            {futureGames.length > 0 ? (
                <div>
                    {futureGames.map((game, index) => (
                        <div key={index} className="past-grid-container">
                            <div className="past-grid">
                                <div className="past-item-1 grid-item">
                                    <p className="font-bold">Start Date</p>
                                    <p className="white-box">{formatDateString(game.dates.from, false)}</p>
                                </div>
                                <div className="past-item-2 grid-item">
                                    <p className="font-bold">End Date</p>
                                    <p className="white-box">{formatDateString(game.dates.to, true)}</p>
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
                            <div className="flex justify-end">
                                <Dialog open={openDialogId === game.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? game.id : null)}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" className="delete-game-button">
                                            <TrashIcon className="mr-2 h-4 w-4" /> Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Game?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete the game that will take place from{" "}
                                                {formatDateString(game.dates.from, false)} to {formatDateString(game.dates.to, true)}, meaning it will never be released.
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
                <h2>No future games found</h2>
            )}
        </div>
    );
};

export default FutureGames;
