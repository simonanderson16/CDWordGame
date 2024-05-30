import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateSelect from "./DateSelect.jsx";
import RequiredSelect from "./RequiredSelect.js";
import { format } from "date-fns";
import AvailableSelect from "./AvailableSelect.js";

const Make = () => {
  const [date, setDate] = useState<Date>();
  const [requiredLetter, setRequiredLetter] = useState<string>("");
  const [availableLetters, setAvailableLetters] = useState<Array<string>>([]);

  return (
    <div>
      <h1>Make Game</h1>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="date">1. Date</TabsTrigger>
          <TabsTrigger value="required">2. Required Letter</TabsTrigger>
          <TabsTrigger value="available">3. Available Letters</TabsTrigger>
        </TabsList>
        <TabsContent value="date">
          <div>
            <p>Select the date.</p>
            <DateSelect date={date} setDate={setDate} />
          </div>
        </TabsContent>
        <TabsContent value="required">
          <div>
            <p>Select the required letter.</p>
            <RequiredSelect
              requiredLetter={requiredLetter}
              setRequiredLetter={setRequiredLetter}
            />
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div>
            <p>Select the available letters.</p>
            <AvailableSelect
              availableLetters={availableLetters}
              setAvailableLetters={setAvailableLetters}
            />
          </div>
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
