import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import "../styles/Play.css";
import { useEffect, useState } from "react";
import { Game } from "@/types";
import {
  PlayIcon,
  SymbolIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  FaceIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import LoadingIcons from "react-loading-icons";
import axios from "axios";

const Play = () => {
  const MAX_WORD_LENGTH = 18;

  const [game, setGame] = useState<Game | undefined>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameExists, setGameExists] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const fetchTodaysGame = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/play`);
    if (response.data.length > 0) {
      setGame(response.data[0]);
      setGameExists(true);
    } else {
      setGameExists(false);
    }
    setLoading(false);
  };

  const handlePlayGame = async () => {
    setPlaying(true);
    await axios.put(`${import.meta.env.VITE_SERVER_URL}/play`, {
      id: game?.id,
      currentPlays: game?.plays,
    });
  };

  const handleLetterPress = (letter: string) => {
    if (input.length < MAX_WORD_LENGTH) {
      setInput((prevInput) => prevInput + letter.toUpperCase());
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleShuffle = () => {
    if (game) {
      let letters = game.availableLetters;
      letters.sort(() => Math.random() - 0.5);
      setGame({ ...game, availableLetters: letters });
    }
  };

  const handleGuess = () => {
    if (game) {
      if (input.length < 4) {
        setInputError("Too Short");
      } else if (
        [...input].some(
          (letter) =>
            !game.availableLetters.includes(letter) &&
            !(letter === game.requiredLetter)
        )
      ) {
        setInputError("Bad Letters");
      } else if (!input.includes(game.requiredLetter)) {
        setInputError("Missing Center Letter");
      } else if (foundWords.includes(input)) {
        setInputError("Already Found");
      } else if (game.answers.includes(input)) {
        setFoundWords((prev) => [...prev, input]);
      } else {
        setInputError("Not in Word List");
      }
    }
    clearInput();
  };

  const clearInput = () => {
    setInput("");
  };

  useEffect(() => {
    fetchTodaysGame();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(event.key) && input.length <= MAX_WORD_LENGTH) {
        setInput((prevInput) => prevInput + event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (event.key === "Enter") {
        handleGuess();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  // clear input error after delay
  useEffect(() => {
    let timeoutId: any;
    if (inputError) {
      timeoutId = setTimeout(() => {
        setInputError("");
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputError]);

  return (
    <div className="play-container">
      <h1 className="header">Hoos Spelling</h1>
      <div className="top-right">
        <img className="cd-logo" src="./cdLogo.png" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="instructions-button">
              <InfoCircledIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <p className="info-header">Rules</p>
                <p className="rules">
                  Always using the center letter, make as many words as possible
                  from the letters provided. Repeated letters are allowed. The
                  words must be four or more letters long. No proper nouns,
                  slang, epithets or slurs are permitted.
                </p>
                {game && (
                  <>
                    <p className="info-header">Today's Levels</p>
                    <p className="text-sm italic">One point equals one word.</p>
                    <ul className="text-sm">
                      <li>Wa: {game.levels.Wa} points</li>
                      <li>Wahoo: {game.levels.Wahoo} points</li>
                      <li>Wahoowa: {game.levels.Wahoowa} points</li>
                      <li>WahooWOW: {game.levels.WahooWOW} points</li>
                      <li>Average: {game.levels.Average} points</li>
                    </ul>
                  </>
                )}
                <p className="info-header">Credits</p>
                {game?.credits.puzzle && (
                  <p className="text-sm">Puzzle by {game?.credits.puzzle}</p>
                )}
                {game?.credits.words && (
                  <p className="text-sm">
                    Words from{" "}
                    <a
                      className="linkedin-link text-primary"
                      href={game?.credits.words}
                      target="_blank"
                    >
                      {game?.credits.words}
                    </a>
                  </p>
                )}
                <p className="text-sm">
                  Site by{" "}
                  <a
                    className="linkedin-link text-primary"
                    href="https://www.linkedin.com/in/simonanderson16/"
                    target="_blank"
                  >
                    Simon Anderson
                  </a>
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {game && playing ? (
        <div className="play-inner-container">
          <div className="play-half-1">
            <div className="input-area">
              <div className="input-box">
                {input.split("").map((char, index) => (
                  <span
                    key={index}
                    className={
                      char === game.requiredLetter
                        ? "text-primary input-text"
                        : game.availableLetters.includes(char)
                        ? "input-text"
                        : "text-gray-400 input-text"
                    }
                  >
                    {char}
                  </span>
                ))}
                <div className="cursor"></div>
              </div>
              {inputError && (
                <Badge className="input-error">{inputError}</Badge>
              )}
            </div>
            <div className="letters">
              <div
                onClick={() => handleLetterPress(game.requiredLetter)}
                className="required-letter letter-button border text-2xl bg-primary text-white"
              >
                {game.requiredLetter}
              </div>
              {game.availableLetters.map((letter, index) => (
                <div
                  onClick={() => handleLetterPress(letter)}
                  key={index}
                  className={`letter-${index} letter-button border text-2xl`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="game-controls">
              <div className="control-button border" onClick={handleBackspace}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Delete
              </div>
              <div
                className="control-button border bg-primary text-white"
                onClick={handleShuffle}
              >
                <SymbolIcon />
              </div>
              <div className="control-button border" onClick={handleGuess}>
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Enter
              </div>
            </div>
          </div>
          <div className="play-half-2">
            {foundWords.length === 0 ? (
              <h2 className="found-words-header mb-2">
                You have found <span className="text-primary">0</span> words
              </h2>
            ) : (
              <div className="w-full h-5/6 text-center">
                <h2 className="found-words-header mb-2">
                  You have found{" "}
                  <span className="text-primary">{foundWords.length}</span>{" "}
                  {foundWords.length === 1 ? "word" : "words"}
                </h2>
                <ScrollArea className="found-words h-full w-full rounded-md py-2 px-5">
                  {foundWords.map((word, index) => (
                    <div key={index}>
                      <p className="found-word">{word}</p>
                      <div className="divider"></div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {gameExists ? (
            <>
              <Button
                onClick={handlePlayGame}
                disabled={!game}
                className="play-button"
              >
                {loading ? (
                  <LoadingIcons.ThreeDots className="loading" speed={0.75} />
                ) : (
                  <>
                    <PlayIcon className="mr-2 h-4 w-4" /> Play Today's Game
                  </>
                )}
              </Button>
              <div className="home-cards">
                <Card className="home-card">
                  <CardContent className="px-4 pt-2 pb-4">
                    <h2 className="font-bold">Rules</h2>
                    <p className="text-sm">
                      Always using the center letter, make as many words as
                      possible from the letters provided. Repeated letters are
                      allowed. The words must be four or more letters long. No
                      proper nouns, slang, epithets or slurs are permitted.
                    </p>
                  </CardContent>
                </Card>
                {game && (
                  <Card className="home-card">
                    <CardContent className="px-4 pt-2 pb-4">
                      <h2 className="font-bold">Levels</h2>
                      <p className="text-sm italic">One point equals one word.</p>
                      <ul className="text-sm mt-1">
                        <li>Wa: {game.levels.Wa} points</li>
                        <li>Wahoo: {game.levels.Wahoo} points</li>
                        <li>Wahoowa: {game.levels.Wahoowa} points</li>
                        <li>WahooWOW: {game.levels.WahooWOW} points</li>
                        <li>Average: {game.levels.Average} points</li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <p className="flex items-center gap-2 border p-3 rounded">
              No game today, come back soon <FaceIcon />
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Play;
