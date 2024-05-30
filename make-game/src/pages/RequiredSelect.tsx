import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const RequiredSelect = ({
  requiredLetter,
  setRequiredLetter,
  availableLetters,
}: {
  requiredLetter: string;
  setRequiredLetter: (requiredLetter: string) => void;
  availableLetters: Array<string>;
}) => {
  const [currentSelection, setCurrentSelection] = useState<string>(
    requiredLetter || ""
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      setCurrentSelection(key.toUpperCase());
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const handleSubmit = () => {
    if (!availableLetters.includes(currentSelection)) {
      setErrorMessage("");
      setRequiredLetter(currentSelection);
    } else {
      setErrorMessage(
        "Required letter can not be one of the other available letters"
      );
    }
  };

  return (
    <div className="make-step-container">
      <h3 className="instructions">
        Type the letter which you would like to be the required letter for this
        game.
      </h3>
      <div className="selected-letter">
        <p>{currentSelection}</p>
      </div>
      <Button onClick={() => handleSubmit()} disabled={!currentSelection}>
        Confirm
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RequiredSelect;

/* 

TODO: 

add a key that tells them about backspace, typing, etc.

*/
