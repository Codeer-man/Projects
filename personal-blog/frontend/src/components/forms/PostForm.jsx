import { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

export default function PostForm() {
  const { authorizeToken } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newBlog = async (post) => {
    setLoading(true);
    setError(null);
    setData(null);

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

      if (response.ok) {
        toast.success(data.message || "Blog created successfully!");
        setPost({ title: "", content: "" }); // Reset form
        return navigate("/");
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to create post", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newBlog(post);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="title" className="block font-semibold">
        Title
      </label>
      <input
        type="text"
        placeholder="Enter title"
        value={post.title}
        name="title"
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
      />

      <label htmlFor="content" className="block font-semibold">
        Content
      </label>
      <textarea
        placeholder="Enter content"
        value={post.content}
        name="content"
        onChange={handleChange}
        className="w-full p-2 border rounded-md h-28"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-500 text-white p-2 rounded-md ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
