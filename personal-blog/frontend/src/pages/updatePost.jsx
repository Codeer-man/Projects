import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { fetchSingleBlog } from "../services/api";
import { toast } from "react-toastify";

export default function UpdatePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authorizeToken } = useAuth();
  const [update, setUpdate] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_UPDATE_POST
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetchSingleBlog(id);
          if (response.data) {
            setUpdate({
              title: response.data.title || "",
              content: response.data.content || "",
              image: response.data.url || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load post data");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}${id}/update`, {
        method: "PATCH",
        headers: {
          Authorization: authorizeToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Post updated successfully");
        navigate(`/view-post/${id}`);
      } else {
        toast.error(data.message || "Failed to update post");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={update.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={update.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-32"
            required
          />
        </div>
        {update.image && (
          <div className="mb-4">
            <img
              src={update.image}
              alt="Post"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
