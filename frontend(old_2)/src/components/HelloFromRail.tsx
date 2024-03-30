import React from "react";

const BACKEND_API_URL =
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev/";

const fetchContent = async (updateContent: (content: string) => void) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}greetings/hello`, {
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    updateContent(data.content);
  } catch (error) {
    console.log(error);
  }
};

export default function HelloFromRail(): any {
  const [content, updateContent] = React.useState(
    "Waiting for a response from Rails..."
  );
  React.useEffect(() => {
    fetchContent(updateContent);
  }, []);

  return <p>{content}</p>;
}
