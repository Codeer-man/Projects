import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import {
  FiSearch,
  FiEye,
  FiUser,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import { FaRegSadTear } from "react-icons/fa";

export default function Post() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_GETALL_POST
  } `;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setData(data.data);
          setFilteredData(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        setError(error.message);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  useEffect(() => {
    const results = data.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex justify-center">
            <FaRegSadTear className="mr-2" /> Error
          </h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
          >
            <FiRefreshCw className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Blog Posts
          </h1>

          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FiSearch className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search posts by title, content or author..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {post.url && (
                  <img
                    src={post.url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiUser className="mr-1" />
                    <span className="mr-3">
                      {post.authorUsername || "Unknown"}
                    </span>
                    <FiCalendar className="mr-1" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/view-post/${post._id}`}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <FiEye className="mr-2" />
                    View Post
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <FaRegSadTear className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">
              No posts found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm
                ? "Try a different search term"
                : "There are no posts available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
