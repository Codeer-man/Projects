import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userBlog } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Myblog() {
  const { author } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await userBlog(author);
        if (!blogs || !blogs.data) {
          setError("No posts found");
          return;
        }
        setData(blogs.data);
        console.log(blogs);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch posts");
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
        // navigate("/");
        toast.success("post deleated");
      }
    } catch (error) {
      console.log("Error deleting data", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        {data.length > 0 ? (
          data.map((post) => (
            <div
              key={post._id}
              className="card mb-6 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                {/* Image Section */}
                {post.url && (
                  <div className="md:w-1/3">
                    <img
                      src={post.url}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 md:w-2/3">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {post.content.length > 20
                      ? post.content.slice(0, 30) + "...."
                      : post.content}
                    {/* {post.content} */}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {/* Posted by {post.author || "Unknown"} •{" "} */}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex space-x-2">
                      <div>
                        <Link to={`/view-post/${post._id}`}>View post</Link>
                      </div>
                      <button
                        onClick={() => DeletePost(post._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/api/blog/${post._id}/update`}
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
