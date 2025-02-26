import { useEffect, useState } from "react";
import { fetchBlog as getBlog } from "../services/api";

export const useBlog = () => {
  const [blogs, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await getBlog();
        setBlog(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, []);

  return { loading, error, blogs };
};
