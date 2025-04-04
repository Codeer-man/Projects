import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

export default function PostForm() {
  const { authorizeToken, user, storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unauthorized, setunauthorized] = useState(true);

  const newBlog = async (postData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("author", user._id);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        "http://localhost:5000/api/blog/createPost",
        {
          method: "POST",
          headers: {
            Authorization: authorizeToken,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Blog created successfully!");
        setPost({ title: "", content: "" });
        setImage(null);
        setImagePreview(null);
        navigate(`/blog-post`);
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to create post", error);
      setError(error.message);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please Log In first");
      navigate("/login");
      return;
    }

    await newBlog(post);
  };
  useEffect(() => {
    if (!token) {
      setunauthorized(true);
    } else {
      setunauthorized(false);
    }
  }, [storeTokenInLS]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="w-screen min-h-screen py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={post.title}
              name="title"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              placeholder="Enter content"
              value={post.content}
              name="content"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-40"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Featured Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              accept="image/*"
              required
            />

            {/* Image preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto max-h-64 rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
