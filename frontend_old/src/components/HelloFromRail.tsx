import React from "react";
import axios from "axios";

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev/";

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
