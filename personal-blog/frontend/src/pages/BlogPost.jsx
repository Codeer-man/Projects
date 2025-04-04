import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";


export default function Post() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blog/getpost`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setData(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
                  {post.content.length > 100
                    ? post.content.slice(0, 150) + "...."
                    : post.content}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Posted by {post.author?.username || "Unknown"} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Link to={`/view-post/${post._id}`}>View Post</Link>
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
  );
}
