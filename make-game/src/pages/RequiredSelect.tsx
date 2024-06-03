import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import "../styles/Create.css";

const RequiredSelect = ({
  requiredLetter,
  setRequiredLetter,
  availableLetters,
  setTab,
}: {
  requiredLetter: string;
  setRequiredLetter: (requiredLetter: string) => void;
  availableLetters: Array<string>;
  setTab: (tab: string) => void
}) => {
  const [currentSelection, setCurrentSelection] = useState<string>(
    requiredLetter || ""
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Backspace") {
      setCurrentSelection("");
    } else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      setCurrentSelection(key.toUpperCase());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSubmit = () => {
    if (!availableLetters.includes(currentSelection)) {
      setErrorMessage("");
      setRequiredLetter(currentSelection);
      setTab("available")
    } else {
      setErrorMessage(
        "Required letter can not be one of the other available letters."
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <strong>Type</strong> the letter which you would like to be the
          required letter for this game.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-row">
          <div className="selected-letter">
            <p>{currentSelection}</p>
          </div>
          <Button onClick={() => handleSubmit()} disabled={!currentSelection}>
            Confirm
          </Button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </CardContent>
    </Card>
  );
};

export default RequiredSelect;

/* 

TODO: 

add a key that tells them about backspace, typing, etc.

*/
