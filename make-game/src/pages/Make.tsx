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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Tabs defaultValue="date" className="tabs mb-5">
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
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            Below are the details of the game you are currently creating.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="summary-item">
            <p className="summary-label">Date:</p>
            <p className="summary-value">
              {date ? format(date, "PPP") : "Not yet selected"}
            </p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Required Letter:</p>
            <p className="summary-value">
              {requiredLetter || "Not yet selected"}
            </p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Available Letters:</p>
            <p className="summary-value">
              {availableLetters.length === 6
                ? availableLetters.join(" ")
                : "Not yet selected"}
            </p>
          </div>
          <Button
            className="save-button"
            disabled={!date || !requiredLetter || availableLetters.length != 6}
          >
            Save Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Make;

/* 

TODO: 

don't allow date for which there is already a game 

*/
