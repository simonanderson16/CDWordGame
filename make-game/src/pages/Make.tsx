import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateSelect from "./DateSelect.jsx";
import RequiredSelect from "./RequiredSelect.js";
import { format } from "date-fns";
import AvailableSelect from "./AvailableSelect.js";
import "../styles/Make.css";
import { HomeIcon } from "@radix-ui/react-icons";

const Make = () => {
  const [date, setDate] = useState<Date>();
  const [requiredLetter, setRequiredLetter] = useState<string>("");
  const [availableLetters, setAvailableLetters] = useState<Array<string>>([]);

  return (
    <div className="make-container">
      <h1 className="header">Make Game</h1>
      <Link to="/">
        <Button className="home-button">
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Tabs defaultValue="account" className="tabs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="date">1. Date</TabsTrigger>
          <TabsTrigger value="required" disabled={!date}>
            2. Required Letter
          </TabsTrigger>
          <TabsTrigger value="available" disabled={!date || !requiredLetter}>
            3. Additional Letters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="date">
          <DateSelect date={date} setDate={setDate} />
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
      </Tabs>
      <div>
        <p>Date: {date ? format(date, "PPP") : "No date selected"}</p>
        <p>Required Letter: {requiredLetter}</p>
        <p>Available Letters:</p>
        {availableLetters.map((letter, index) => (
          <p key={index}>{letter}</p>
        ))}
      </div>
    </div>
  );
};

export default Make;

/* 

TODO: 

don't allow date for which there is already a game 

*/
