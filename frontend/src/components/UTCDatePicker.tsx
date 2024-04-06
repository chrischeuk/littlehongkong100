import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { start } from "repl";
import "./UTCDatePicker.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function convertUTCToLocalDate(date: Date | null): Date | null {
  if (!date) {
    return date;
  }
  let dateOut = new Date(date);
  dateOut = new Date(
    dateOut.getUTCFullYear(),
    dateOut.getUTCMonth(),
    dateOut.getUTCDate()
  );
  return dateOut;
}

function convertLocalToUTCDate(date: Date): Date {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return date;
}

function addDate(date: Date): Date {
  date = new Date();
  date.setDate(date.getDate() + 365);
  return date;
}
type excludedDatesType = {
  start: Date;
  end: Date;
};

type UTCDatePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: React.Dispatch<React.SetStateAction<Date[] | null[]>>;
  selectsRange: boolean;
  withPortal?: boolean;
  inline?: boolean;
  disabledKeyboardNavigation: boolean;
  excludeDateIntervals?: excludedDatesType[] | undefined;
  placeholderText?: string;
  // setSearchParams: any;
};

type forwardRefProps = {
  value: React.ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

export default function UTCDatePicker({
  startDate,
  endDate,
  setDateRange,
  // setSearchParams,
  ...props
}: UTCDatePickerProps) {
  const ExampleCustomInput = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ value, onClick }, ref) => (
      <div className=" drop-shadow-lg ">
        <button
          className="p-5 w-96 example-custom-input flex flex-row bg-slate-50"
          onClick={onClick}
          ref={ref}
        >
          <MagnifyingGlassIcon className="w-6 h-6 mx-3" />

          {value ? value : "Any dates"}
        </button>
      </div>
    )
  );
  const today = new Date();
  const maxDate = addDate(today);

  return (
    <DatePicker
      startDate={convertUTCToLocalDate(startDate)}
      endDate={convertUTCToLocalDate(endDate)}
      customInput={<ExampleCustomInput />}
      onChange={(update: [Date, Date]) =>
        setDateRange([
          convertLocalToUTCDate(update[0]),
          convertLocalToUTCDate(update[1]),
        ])
      }
      minDate={today}
      maxDate={addDate(today)}
      // selectsDisabledDaysInRange
      {...props}
    />
  );
}
