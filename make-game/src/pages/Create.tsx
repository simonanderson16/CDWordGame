import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateSelect from "./DateSelect.js";
import RequiredSelect from "./RequiredSelect.js";
import { format } from "date-fns";
import AvailableSelect from "./AvailableSelect.js";
import "../styles/Make.css";
import { HomeIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [tab, setTab] = useState<string>("dates");

  useEffect(() => {
    setAnswers([]);
  }, [availableLetters, requiredLetter]);

  const onTabChange = (value: string) => {
    setTab(value);
  };

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
    <div className="make-container">
      <h1 className="header">Create Game</h1>
      <Link to="/">
        <Button className="home-button">
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Tabs
        defaultValue="dates"
        className="tabs mb-5"
        value={tab}
        onValueChange={onTabChange}
      >
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
          <DateSelect dates={dates} setDates={setDates} setTab={setTab} />
        </TabsContent>
        <TabsContent value="required">
          <RequiredSelect
            requiredLetter={requiredLetter}
            setRequiredLetter={setRequiredLetter}
            availableLetters={availableLetters}
            setTab={setTab}
          />
        </TabsContent>
        <TabsContent value="available">
          <AvailableSelect
            requiredLetter={requiredLetter}
            availableLetters={availableLetters}
            setAvailableLetters={setAvailableLetters}
            setTab={setTab}
            setAnswers={setAnswers}
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
              {dates ? (
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
                    <Button variant="outline">
                      View All ({answers.length})
                    </Button>
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
