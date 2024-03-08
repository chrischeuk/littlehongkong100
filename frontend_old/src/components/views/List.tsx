import React from "react";
import axios from "axios";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev/";

type Item = {
  item_id: string;
  item_name: string;
};

export default function List() {
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
    <div>
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
}
