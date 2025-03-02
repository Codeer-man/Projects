import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const useCreateBlog = () => {
  const { authorizeToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newBlog = async (post) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/blog/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizeToken,
          },
          body: JSON.stringify(post),
        }
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to create post", error);
      setError("Something went wrong. Try again!");
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, newBlog };
};

// Not working in the error so not in use
