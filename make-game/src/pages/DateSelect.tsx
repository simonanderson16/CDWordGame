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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardDescription>
          Select the date on which you would like the game to be released.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-row">
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
      </CardContent>
    </Card>
  );
};

export default DateSelect;
