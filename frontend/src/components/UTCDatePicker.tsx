import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UTCDatePicker.css";
import { MagnifyingGlassIcon, AdjustmentsVerticalIcon} from "@heroicons/react/24/solid";

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
  available_from?: string;
  available_to?: string;
};

// type forwardRefProps = {
//   value: React.ReactElement;
//   onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
// };

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

export default function UTCDatePicker({
  startDate,
  endDate,
  setDateRange,
  available_to,
  available_from,
  // setSearchParams,
  ...props
}: UTCDatePickerProps) {
  const ExampleCustomInput = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ value, onClick }, ref) => (
      <div className=" drop-shadow-lg flex flex-row justify-center items-center mx-3">
        <button
          className="m-3 p-5 w-5/6 example-custom-input bg-slate-50 sm:w-2/6"
          onClick={onClick}
          ref={ref}
        >
          <div className=" flex flex-row">
            <MagnifyingGlassIcon className="w-6 h-6 mx-3" />
            <p> {value ? value : "Any dates"}</p>
          </div>
        </button>
        <div className=" bg-slate-100 m-5 w-11 h-11 rounded-full flex justify-center flex-shrink-0">
          <AdjustmentsVerticalIcon className="w-5"/>
        </div>
      </div>
    )
  );
  const today = new Date();
  const minDate = () => {
    if (available_from != null) {
      let available_from_utc =
        convertUTCToLocalDate(new Date(available_from))?.getTime() ||
        today.getTime();
      return new Date(Math.max(today.getTime(), available_from_utc));
    } else {
      return today;
    }
  };

  const maxDate = () => {
    if (available_to != undefined) {
      let available_to_utc =
        convertUTCToLocalDate(new Date(available_to))?.getTime() ||
        today.getTime();
      return new Date(Math.min(addDate(today).getTime(), available_to_utc));
    } else {
      return addDate(today);
    }
  };

  const handleCalendarOpen = () => {
    document.addEventListener('touchstart', (event: TouchEvent) => {
        event.stopPropagation();
    }, true);
};

  return (
    <DatePicker
      startDate={convertUTCToLocalDate(startDate)}
      endDate={convertUTCToLocalDate(endDate)}
      customInput={<ExampleCustomInput />}
      onCalendarOpen={handleCalendarOpen}


      onChange={(update: [Date, Date]) =>
        setDateRange([
          convertLocalToUTCDate(update[0]),
          convertLocalToUTCDate(update[1]),
        ])
      }
      minDate={minDate()}
      maxDate={maxDate()}
      // selectsDisabledDaysInRange
      {...props}
    />
  );
}
