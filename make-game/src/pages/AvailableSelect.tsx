import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const AvailableSelect = ({
  requiredLetter,
  availableLetters,
  setAvailableLetters,
  setTab,
  setAnswers
}: {
  requiredLetter: string;
  availableLetters: Array<string>;
  setAvailableLetters: (availableLetters: Array<string>) => void;
  setTab: (tab: string) => void;
  setAnswers: (answers: Array<string>) => void
}) => {
  const [currentSelection, setCurrentSelection] =
    useState<Array<string>>(availableLetters);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "Backspace") {
      setCurrentSelection((prevSelection) => prevSelection.slice(0, -1));
    } else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      const upperKey = key.toUpperCase();
      setCurrentSelection((prevSelection) => {
        const newSelection = [...prevSelection];
        if (newSelection.length < 6 && !newSelection.includes(upperKey)) {
          newSelection.push(upperKey);
        } else if (!newSelection.includes(upperKey)) {
          newSelection[newSelection.length - 1] = upperKey;
        }
        return newSelection;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = () => {
    if (!currentSelection.includes(requiredLetter)) {
      setErrorMessage("");
      setAvailableLetters(currentSelection);
      setAnswers([])
      setTab("answers");
    } else {
      setErrorMessage("Can not include the required letter in this selection.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <strong>Type</strong> the 6 additional letters which you would like to
          be available for this game.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-row">
          <div className="selected-available-letters">
            {currentSelection.map((letter, index) => (
              <div className="selected-letter" key={index}>
                <p>{letter}</p>
              </div>
            ))}
            {
              // empty squares
              [...Array(6 - currentSelection.length)].map((_, index) => (
                <div
                  className="selected-letter"
                  key={index + currentSelection.length}
                >
                  <p></p>
                </div>
              ))
            }
          </div>
          <Button
            onClick={() => handleSubmit()}
            disabled={currentSelection.length != 6}
          >
            Confirm
          </Button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </CardContent>
    </Card>
  );
};

export default AvailableSelect;

/* 

TODO: 

if required letter is selected, don't allow a submit button if selection contains required letter

*/
