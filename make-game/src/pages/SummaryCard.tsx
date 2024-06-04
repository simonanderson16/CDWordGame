import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import axios from "axios";
import "../styles/Create.css";

const SummaryCard = ({
  dates,
  setDates,
  requiredLetter,
  setRequiredLetter,
  availableLetters,
  setAvailableLetters,
  answers,
  setAnswers,
  setTab,
}: {
  dates: DateRange | undefined;
  setDates: (dates: DateRange | undefined) => void;
  requiredLetter: string;
  setRequiredLetter: (requiredLetter: string) => void;
  availableLetters: Array<string>;
  setAvailableLetters: (availableLetters: Array<string>) => void;
  answers: Array<string>;
  setAnswers: (answers: Array<string>) => void;
  setTab: (tab: string) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const clear = () => {
    setDates(undefined);
    setRequiredLetter("");
    setAvailableLetters([]);
    setAnswers([]);
  };

  const sortAnswers = () => {
    return answers.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    });
  };

  const getSingleDateString = (date: Date | undefined) => {
    if (date) {
      return `${
        date?.getMonth() + 1
      }-${date?.getDate()}-${date?.getFullYear()}`;
    } else {
      return "Not yet selected";
    }
  };

  const getGameObject = () => {
    return {
      id: `${getSingleDateString(dates?.from)}-${getSingleDateString(
        dates?.to
      )}`,
      data: {
        dates,
        requiredLetter,
        availableLetters,
        answers,
        plays: 0
      },
    };
  };

  const saveGame = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/create",
        getGameObject()
      );
      setErrorMessage("");
      setSuccessMessage(response.data.message);
    } catch (e: any) {
      setSuccessMessage("");
      setErrorMessage(e.response.data.error);
    }
  };

  return (
    <Card className="summary-card">
      <CardHeader>
        <CardDescription>
          <strong>Summary</strong>
        </CardDescription>
        <CardDescription>
          Below are the details of the game you are currently creating.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="summary-grid">
          <div className="summary-item">
            <p className="summary-label">Dates</p>
            {dates?.from && dates?.to ? (
              <>
                <Button variant="outline" onClick={() => setTab("dates")}>
                  {format(dates.from, "LLL dd, y")} -{" "}
                  {format(dates.to, "LLL dd, y")}
                </Button>
              </>
            ) : (
              <Button variant="outline" disabled>
                Not yet selected
              </Button>
            )}
          </div>
          <div className="summary-item">
            <p className="summary-label">Required Letter</p>
            {requiredLetter ? (
              <Button variant="outline" onClick={() => setTab("required")}>
                {requiredLetter}
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Not yet selected
              </Button>
            )}
          </div>
          <div className="summary-item">
            <p className="summary-label">Additional Letters</p>
            {availableLetters.length === 6 ? (
              <Button variant="outline" onClick={() => setTab("available")}>
                {availableLetters.join(" ")}
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Not yet selected
              </Button>
            )}
          </div>
          <div className="summary-item">
            <p className="summary-label">Answers</p>
            {answers.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">View All ({answers.length})</Button>
                </PopoverTrigger>
                <PopoverContent>
                  {sortAnswers().map((answer, index) => (
                    <p key={index}>{answer}</p>
                  ))}
                  <Button
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                    }}
                    variant="ghost"
                    onClick={() => setTab("answers")}
                  >
                    <Pencil2Icon />
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button variant="outline" disabled>
                Not yet selected
              </Button>
            )}
          </div>
        </div>
        {successMessage && (
          <p className="success-message submit-success">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message submit-error">{errorMessage}</p>
        )}
        <div className="card-row-between">
          <Button
            className="summary-button"
            disabled={
              !dates ||
              !requiredLetter ||
              availableLetters.length != 6 ||
              answers.length === 0
            }
            onClick={() => saveGame()}
          >
            Save Game
          </Button>
          <Button
            disabled={!dates && !requiredLetter && availableLetters.length != 6}
            variant="destructive"
            onClick={() => {
              clear();
              setTab("dates");
            }}
            className="summary-button"
          >
            <TrashIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
