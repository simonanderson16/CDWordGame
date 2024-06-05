import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import "../styles/Play.css";
import { useEffect, useState } from "react";
import { Game } from "@/types";
import {
  PlayIcon,
  SymbolIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  FaceIcon,
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
    const response = await axios.get("http://localhost:8888/play");
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
    await axios.put("http://localhost:8888/play", {
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
              <Button
                onClick={() => handleLetterPress(game.requiredLetter)}
                className="required-letter h-full text-xl"
              >
                {game.requiredLetter}
              </Button>
              {game.availableLetters.map((letter, index) => (
                <Button
                  onClick={() => handleLetterPress(letter)}
                  variant="outline"
                  key={index}
                  className={`letter-${index} h-full text-xl`}
                >
                  {letter}
                </Button>
              ))}
            </div>
            <div className="game-controls">
              <Button variant="outline" onClick={handleBackspace}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button onClick={handleShuffle}>
                <SymbolIcon />
              </Button>
              <Button variant="outline" onClick={handleGuess}>
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Enter
              </Button>
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
