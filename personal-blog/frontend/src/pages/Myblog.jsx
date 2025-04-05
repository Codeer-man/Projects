import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userBlog } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

export default function Myblog() {
  const { author } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Changed initial state to true
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); // Added loading state when fetch starts
        const blogs = await userBlog(author);
        if (!blogs || !blogs.data) {
          setError("No posts found");
          return;
        }
        setData(blogs.data);
        setFilter(blogs.data);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch posts");
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [author]);

  const DeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setData((prevData) => prevData.filter((post) => post._id !== postId));
        setFilter((prevFilter) =>
          prevFilter.filter((post) => post._id !== postId)
        );
        toast.success("Post deleted");
      }
    } catch (error) {
      console.log("Error deleting data", error);
      setError(error.message);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    const result = data.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilter(result);
  }, [searchTerm, data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <FiSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search posts by title, content"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filter.length > 0 ? (
          filter.map((post) => (
            <div
              key={post._id}
              className="card mb-6 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                {post.url && (
                  <div className="md:w-1/3">
                    <img
                      src={post.url}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                <div className="p-6 md:w-2/3">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {post.content.length > 20
                      ? post.content.slice(0, 30) + "...."
                      : post.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/view-post/${post._id}`}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => DeletePost(post._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/blog/${post._id}/update`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p>No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
