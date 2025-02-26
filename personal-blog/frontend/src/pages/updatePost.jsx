import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();
  const [update, setUpdatte] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/blog/67bb234f3a991a9a847233e2/update",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        
        // setUpdatte(data.data);
        setUpdatte({
          title: "",
          content: "",
          author: "",
        });
      }
    } catch (error) {}
  });

  return (
    <div>
      <form type="submit">
        <input type="text" placeholder="title" value={update.title} />
        <input type="text" placeholder="content" value={update.content} />
        <input type="text" placeholder="author" value={update.author} />
        <button>Submit</button>
      </form>
    </div>
  );
}
