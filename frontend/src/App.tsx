import React from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
 


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "http://35.200.59.229:3000"  ;

const fetchContent = async (updateContent: (content: string) => void) => {
  const response = await fetch(`${BACKEND_API_URL}/greetings/hello`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  updateContent(data.content);
};

const getContent = async (startDate,updateItems, endDate) =>{
  const response = await axios.get(`${BACKEND_API_URL}/api/v1/items/show`,{
    params:{
      date_from: startDate,
      date_to: endDate
      
    }
  })
  updateItems(response.data)
  console.log(response.data)

}


const App: React.FC = () => {
  const [content, updateContent] = React.useState('Waiting for a response from Rails...');
  const [items, updateItems] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  

  React.useEffect(() => {
    fetchContent(updateContent);
  }, []);

  React.useEffect(() => {
    if(startDate !== null && endDate!== null){
      getContent(startDate, updateItems,endDate)
      console.log("run")
    }
  }, [dateRange]);

  return (
    <div className="App">
      <header>
        <p>
          {content}
          
        </p>
      </header>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update:any) => {
          setDateRange(update);
        }}
        withPortal
      />
      {items.map((item)=>{return <p key={item.item_id}>{item.item_name}</p>})}
    </div>
  );
}

export default App;
