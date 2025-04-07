import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import LoadingSpinner from "../LoadingSpinner";

export default function PostForm() {
  const { authorizeToken, user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setShowLoginPopup(true);
    }
  }, [token]);

  const newBlog = async (postData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("author", user._id);
      formData.append("authorUsername", user.autherusername);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please Log In first");
      navigate("/login");
      return;
    }

    if (!post.title || !post.content || !image) {
      toast.error("Please fill all the fields!");
      return;
    }

    await newBlog(post);
  };

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
    <div
      className={`h-screen py-10 px-4 ${
        showLoginPopup ? "backdrop-blur-sm" : ""
      }`}
    >
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Authentication Required
              </h3>
              <p className="text-gray-600 mb-6">
                You need to log in to create and share your blog posts with the
                community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Log In Now
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showLoginPopup && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://cdn.pixabay.com/photo/2024/06/30/10/28/sky-8862862_1280.png)`,
            }}
          ></div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Create a New Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={post.title}
                  name="title"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Enter content"
                  value={post.content}
                  name="content"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  accept="image/*"
                  required
                />

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
                      Publishing...
                    </>
                  ) : (
                    "Publish Post"
                  )}
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
