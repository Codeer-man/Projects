import { useEffect, useState } from "react";
import { fetchSingleBlog as getSingleBlog } from "../services/api";

export const useSingleBlog = (id) => {
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSingleBlog = async () => {
      setLoading(true);
      try {
        if (!id) return console.error("id not found");
        const response = await getSingleBlog(id);
        setSingleBlog(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadSingleBlog();
  }, [id]);
  return { loading, error, singleBlog };
};
