import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const AvailableSelect = ({
  availableLetters,
  setAvailableLetters,
}: {
  availableLetters: Array<string>;
  setAvailableLetters: (availableLetters: Array<string>) => void;
}) => {
  const [currentSelection, setCurrentSelection] =
    useState<Array<string>>(availableLetters);

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

  return (
    <>
      <h3>
        Type the 6 letters which you would like to be available for this game.
      </h3>
      {currentSelection.map((letter, index) => (
        <p key={index}>{letter}</p>
      ))}
      <Button
        onClick={() => setAvailableLetters(currentSelection)}
        disabled={currentSelection.length === 0}
      >
        Confirm
      </Button>
    </>
  );
};

export default AvailableSelect;

/* 

TODO: 

if required letter is selected, don't allow a submit button if selection contains required letter

*/
