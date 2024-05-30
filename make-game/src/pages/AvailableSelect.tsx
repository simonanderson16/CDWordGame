import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const AvailableSelect = ({
  requiredLetter,
  availableLetters,
  setAvailableLetters,
}: {
  requiredLetter: string;
  availableLetters: Array<string>;
  setAvailableLetters: (availableLetters: Array<string>) => void;
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
    } else {
      setErrorMessage("Can not include required letter in this selection.");
    }
  };

  return (
    <div className="make-step-container">
      <h3 className="instructions">
        Type the 6 additional letters which you would like to be available for
        this game.
      </h3>
      <div className="selected-available-letters">
        {currentSelection.map((letter, index) => (
          <div className="selected-letter">
            <p key={index}>{letter}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => handleSubmit()}
        disabled={currentSelection.length === 0}
      >
        Confirm
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AvailableSelect;

/* 

TODO: 

if required letter is selected, don't allow a submit button if selection contains required letter

*/
