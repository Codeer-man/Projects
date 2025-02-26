import { useEffect, useState } from "react";
import { fetchSingleBlog as getSingleBlog } from "../services/api";

export const useSingleBlog = async (id) => {
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSingleBlog = async () => {
      try {
        const response = await getSingleBlog();
        setSingleBlog(response);
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
