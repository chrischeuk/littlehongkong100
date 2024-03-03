import React from "react";
import axios from "axios";

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "http://35.200.59.229:3000";

const fetchContent = async (updateContent: (content: string) => void) => {
  const response = await fetch(`${BACKEND_API_URL}/greetings/hello`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  updateContent(data.content);
};

export default function HelloFromRail() {
  const [content, updateContent] = React.useState(
    "Waiting for a response from Rails...",
  );
  React.useEffect(() => {
    fetchContent(updateContent);
  }, []);

  return <p>{content}</p>;
}
