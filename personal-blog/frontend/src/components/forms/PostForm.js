import React, { useState } from "react";

const initialState = {
  title: "",
  content: "",
  author: "",
  message: "",
};
export default function PostForm() {
  const [Post, setPost] = useState(initialState);


  return <div>PostForm</div>;
}
