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
import { DateRange } from "react-day-picker";
import "../styles/Make.css";

const DateSelect = ({
  dates,
  setDates,
  setTab,
}: {
  dates: DateRange | undefined;
  setDates: (dates: DateRange | undefined) => void;
  setTab: (tab: string) => void;
}) => {
  const [currentSelection, setCurrentSelection] = useState<
    DateRange | undefined
  >(dates || undefined);

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <strong>Select</strong> the dates for which you like the game to be
          available. The start date will be the day the game is released, and
          the end date will be the last day the game is available to play.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !currentSelection && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {currentSelection?.from ? (
                  currentSelection.to ? (
                    <>
                      {format(currentSelection.from, "LLL dd, y")} -{" "}
                      {format(currentSelection.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(currentSelection.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick start and end dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={currentSelection?.from}
                selected={currentSelection}
                onSelect={setCurrentSelection}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => {
              setDates(currentSelection);
              setTab("required");
            }}
            disabled={!currentSelection?.from || !currentSelection?.to}
          >
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateSelect;
