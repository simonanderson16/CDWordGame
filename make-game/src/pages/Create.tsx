import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateSelect from "./DateSelect.js";
import RequiredSelect from "./RequiredSelect.js";
import AvailableSelect from "./AvailableSelect.js";
import { HomeIcon } from "@radix-ui/react-icons";
import AnswerSelect from "./AnswerSelect.js";
import { DateRange } from "react-day-picker";
import SummaryCard from "./SummaryCard.js";
import "../styles/Make.css";

const Create = () => {
  const [dates, setDates] = useState<DateRange | undefined>();
  const [requiredLetter, setRequiredLetter] = useState<string>("");
  const [availableLetters, setAvailableLetters] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [tab, setTab] = useState<string>("dates");

  useEffect(() => {
    setAnswers([]);
  }, [availableLetters, requiredLetter]);

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="make-container">
      <h1 className="header">Hoos Spelling: Create a Game</h1>
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
      <SummaryCard
        dates={dates}
        setDates={setDates}
        requiredLetter={requiredLetter}
        setRequiredLetter={setRequiredLetter}
        availableLetters={availableLetters}
        setAvailableLetters={setAvailableLetters}
        answers={answers}
        setAnswers={setAnswers}
        setTab={setTab}
      />
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
