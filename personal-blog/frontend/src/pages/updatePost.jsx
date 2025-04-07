import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { fetchSingleBlog } from "../services/api";
import { toast } from "react-toastify";

export default function UpdatePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { authorizeToken } = useAuth();
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_UPDATE_POST
  } `;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await fetchSingleBlog(id);
        console.log("response", response);
        setUpdate({
          title: response.data.title,
          content: response.data.content,
          image: response.data.url,
        });
        console.log(response.data);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}${id}/update`, {
        method: "PATCH",
        headers: {
          Authorization: authorizeToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User updated successfully:", data);
        toast.success("The data has been updated");
        navigate(`/view-post/${id}`);
        // setUpdate(data.data);
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Invalid server error:", error);
      toast.error("Server error");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={update.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={update.content}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded h-32"
        />
        <img src={update.image} alt="Image" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
