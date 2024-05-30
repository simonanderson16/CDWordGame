"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "../styles/Make.css";

const DateSelect = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => {
  const [currentSelection, setCurrentSelection] = useState<Date | undefined>(
    date || undefined
  );

  return (
    <div className="make-step-container">
      <p className="instructions">
        Select the date on which you would like the game to be released.
      </p>
      <div className="date-input-row">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !currentSelection && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentSelection ? (
                format(currentSelection, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={currentSelection}
              onSelect={setCurrentSelection}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => setDate(currentSelection)}
          disabled={!currentSelection}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DateSelect;
