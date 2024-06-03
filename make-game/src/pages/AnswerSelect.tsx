import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

const AnswerSelect = ({
  requiredLetter,
  availableLetters,
  answers,
  setAnswers,
}: {
  requiredLetter: string;
  availableLetters: Array<string>;
  answers: Array<string>;
  setAnswers: (answers: Array<string>) => void;
}) => {
  const [currentSelection, setCurrentSelection] = useState<Array<string>>(
    answers || []
  );
  const [input, setInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const removeWord = (index: number) => {
    setCurrentSelection((prevSelection) =>
      prevSelection.filter((_, i) => i !== index)
    );
  };

  const handleAddWord = (e: any) => {
    e.preventDefault();
    if (!input.includes(requiredLetter)) {
      setErrorMessage(
        `The word must contain the required letter "${requiredLetter}".`
      );
      return;
    }
    if (input.length < 4) {
      setErrorMessage("The word must be at least 4 characters long.");
      return;
    }
    const allowedLetters = new Set([requiredLetter, ...availableLetters]);
    for (let char of input) {
      if (!allowedLetters.has(char)) {
        setErrorMessage("The word must only contain your chosen letters.");
        return;
      }
    }
    if (currentSelection.includes(input)) {
      setErrorMessage("You have already added this word to the answer bank.");
      return;
    }
    setCurrentSelection([input, ...currentSelection]);
    setInput("");
    setErrorMessage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <strong>Type</strong> a word that you would like to be part of the
          answers and press enter to add it to the answer bank.
        </CardDescription>
        <CardContent>
          <form onSubmit={handleAddWord}>
            <div className="card-row">
              <Input
                type="text"
                id="word"
                placeholder="Enter a word"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
              />
              <Button type="submit">Add Word</Button>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {currentSelection.length > 0 && (
            <div className="answer-bank">
              {currentSelection.map((word, index) => (
                <div key={index} className="answer-item">
                  <p>{word}</p>
                  <Button
                    variant="ghost"
                    style={{ color: "red" }}
                    onClick={() => removeWord(index)}
                  >
                    <Cross2Icon />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="card-row-between mt-3">
            <p>Total words: {currentSelection.length}</p>
            <Button
              onClick={() => {
                setAnswers(currentSelection);
                setErrorMessage("");
              }}
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default AnswerSelect;
