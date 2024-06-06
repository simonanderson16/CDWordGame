import { Credits, Levels } from "@/types";
import "../styles/Create.css";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MoreInfo = ({
  levels,
  setLevels,
  credits,
  setCredits,
}: {
  levels: Levels;
  setLevels: (levels: Levels) => void;
  credits: Credits;
  setCredits: (credits: Credits) => void;
}) => {
  const [currentLevelsSelection, setCurrentLevelsSelection] =
    useState<Levels>(levels);
  const [currentCredits, setCurrentCredits] = useState<Credits>(credits);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const updateCurrentLevels = (key: string, value: string) => {
    setCurrentLevelsSelection((prevLevels) => ({
      ...prevLevels,
      [key]: value,
    }));
  };

  const updateCurrentCredits = (key: string, value: string) => {
    setCurrentCredits((prevCredits) => ({
      ...prevCredits,
      [key]: value,
    }));
  };

  const handleConfirm = () => {
    setLevels(currentLevelsSelection);
    setCredits(currentCredits);
  };

  const validateInputs = () => {
    const areLevelsFilled = Object.values(currentLevelsSelection).every(
      (value) => value !== ""
    );
    const areCreditsFilled = Object.values(currentCredits).every(
      (value) => value !== ""
    );
    setButtonDisabled(!(areLevelsFilled && areCreditsFilled));
  };

  useEffect(() => {
    validateInputs();
  }, [currentCredits, currentLevelsSelection]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <strong>Enter</strong> the points requirements to achieve each level,
          and also enter the credits for this puzzle.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 w-full">
          <div className="border mb-3 p-3 rounded w-full">
            <h2 className="font-bold mb-1">Levels</h2>
            <div className="card-row mb-1">
              <h3>Wa: </h3>
              <Input
                type="number"
                value={currentLevelsSelection.Wa}
                onChange={(e) => updateCurrentLevels("Wa", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="card-row mb-1">
              <h3>Wahoo: </h3>
              <Input
                type="number"
                value={currentLevelsSelection.Wahoo}
                onChange={(e) => updateCurrentLevels("Wahoo", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="card-row mb-1">
              <h3>Wahoowa: </h3>
              <Input
                type="number mb-1"
                value={currentLevelsSelection.Wahoowa}
                onChange={(e) => updateCurrentLevels("Wahoowa", e.target.value)}
                className="w-full"
              />
            </div>
            <div className="card-row mb-1">
              <h3>WahooWOW: </h3>
              <Input
                type="number"
                value={currentLevelsSelection.WahooWOW}
                onChange={(e) =>
                  updateCurrentLevels("WahooWOW", e.target.value)
                }
                className="w-full"
              />
            </div>
            <div className="card-row">
              <h3>Average: </h3>
              <Input
                type="number"
                value={currentLevelsSelection.Average}
                onChange={(e) => updateCurrentLevels("Average", e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="border p-3 rounded mb-3 w-full">
            <h2 className="mb-1 font-bold">Credits</h2>
            <div className="mb-2">
              <h3>Puzzle by:</h3>
              <Input
                type="text"
                placeholder="i.e. John Doe"
                className="w-[300px]"
                onChange={(e) => updateCurrentCredits("puzzle", e.target.value)}
              />
            </div>
            <div>
              <h3>Words from:</h3>
              <Input
                type="text"
                placeholder="i.e. https://sbsolver.com"
                className="w-[300px]"
                onChange={(e) => updateCurrentCredits("words", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-row-right">
          <Button disabled={buttonDisabled} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoreInfo;
