import React from "react";
import "./App.css";
import axios from "axios";
import UTCDatePicker from "./components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import "./components/HelloFromRail";
import HelloFromRail from "./components/HelloFromRail";

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "http://35.200.59.229:3000";

type Item = {
  item_id: string;
  item_name: string;
};

const App: React.FC = () => {
  const [items, updateItems] = React.useState<Item[]>([]);
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const getContent = async (
    startDate: Date,
    endDate: Date,
    updateItems: React.Dispatch<React.SetStateAction<Item[]>>,
  ) => {
    const response = await axios.get(`${BACKEND_API_URL}/api/v1/items/show`, {
      params: {
        date_from: startDate,
        date_to: endDate,
      },
    });
    updateItems(response.data);
  };

  React.useEffect(() => {
    if (startDate !== null && endDate !== null) {
      getContent(startDate, endDate, updateItems);
    }
  }, [dateRange]);

  return (
    <div className="App">
      <HelloFromRail />
      <UTCDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        // withPortal
        inline
        disabledKeyboardNavigation
      />
      {items.map((item) => {
        return <p key={item.item_id + item.item_name}>{item.item_name}</p>;
      })}
    </div>
  );
};

export default App;
