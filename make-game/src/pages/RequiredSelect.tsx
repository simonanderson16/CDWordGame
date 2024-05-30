import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const RequiredSelect = ({
  requiredLetter,
  setRequiredLetter,
}: {
  requiredLetter: string;
  setRequiredLetter: (requiredLetter: string) => void;
}) => {
  const [currentSelection, setCurrentSelection] = useState<string>(
    requiredLetter || ""
  );

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

  return (
    <>
      <h3>
        Type the letter which you would like to be the required letter for this
        game.
      </h3>
      <p>{currentSelection}</p>
      <Button
        onClick={() => setRequiredLetter(currentSelection)}
        disabled={!currentSelection}
      >
        Confirm
      </Button>
    </>
  );
};

export default RequiredSelect;

/* 

TODO: 

if available letters are already selected, don't allow a selection that is within that

*/
