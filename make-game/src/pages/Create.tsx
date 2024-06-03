import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateSelect from "./DateSelect.js";
import RequiredSelect from "./RequiredSelect.js";
import { format, getDate } from "date-fns";
import AvailableSelect from "./AvailableSelect.js";
import "../styles/Make.css";
import { HomeIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import AnswerSelect from "./AnswerSelect.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import axios from "axios";

const Create = () => {
  const [dates, setDates] = useState<DateRange | undefined>();
  const [requiredLetter, setRequiredLetter] = useState<string>("");
  const [availableLetters, setAvailableLetters] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setAnswers([]);
  }, [availableLetters]);

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

  useEffect(() => {
    if (dates) {
      console.log(getSingleDateString(dates?.to));
    }
  }, [dates]);

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
      },
    };
  };

  const saveGame = async () => {
    // TODO: save game to firebase
    // document id will be date string
    // if game already exists for that day, set error message
    try {
      await axios.post("http://localhost:8888/create", getGameObject());
      setErrorMessage("");
    } catch (e: any) {
      setErrorMessage(e.response.data.error);
    }
  };

  return (
    <div className="make-container">
      <h1 className="header">Create Game</h1>
      <Link to="/">
        <Button className="home-button">
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Tabs defaultValue="dates" className="tabs mb-5">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dates">1. Dates</TabsTrigger>
          <TabsTrigger value="required" disabled={!dates}>
            2. Required Letter
          </TabsTrigger>
          <TabsTrigger value="available" disabled={!dates || !requiredLetter}>
            3. Additional Letters
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            disabled={
              !dates || !requiredLetter || !(availableLetters.length === 6)
            }
          >
            4. Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dates">
          <DateSelect dates={dates} setDates={setDates} />
        </TabsContent>
        <TabsContent value="required">
          <RequiredSelect
            requiredLetter={requiredLetter}
            setRequiredLetter={setRequiredLetter}
            availableLetters={availableLetters}
          />
        </TabsContent>
        <TabsContent value="available">
          <AvailableSelect
            requiredLetter={requiredLetter}
            availableLetters={availableLetters}
            setAvailableLetters={setAvailableLetters}
          />
        </TabsContent>
        <TabsContent value="answers">
          <AnswerSelect
            requiredLetter={requiredLetter}
            availableLetters={availableLetters}
            answers={answers}
            setAnswers={setAnswers}
          />
        </TabsContent>
      </Tabs>
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
              <p className="summary-value">
                {dates
                  ? `${format(dates.from, "LLL dd, y")} - ${format(
                      dates.to,
                      "LLL dd, y"
                    )}`
                  : "Not yet selected"}
              </p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Required Letter</p>
              <p className="summary-value">
                {requiredLetter || "Not yet selected"}
              </p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Additional Letters</p>
              <p className="summary-value">
                {availableLetters.length === 6
                  ? availableLetters.join(" ")
                  : "Not yet selected"}
              </p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Answers</p>
              {answers.length > 0 ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      View All ({answers.length})
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {sortAnswers().map((answer, index) => (
                      <p key={index}>{answer}</p>
                    ))}
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="summary-value">Not yet selected</p>
              )}
            </div>
          </div>
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
              disabled={
                !dates && !requiredLetter && availableLetters.length != 6
              }
              variant="destructive"
              onClick={() => clear()}
              className="summary-button"
            >
              <TrashIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;

/* 

TODO: 

don't allow date for which there is already a game 
make it so clearing takes you back to date tab
add tab for creating all answers

*/
