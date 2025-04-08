import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { postCounter } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { author, user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [profile, setProfile] = useState(null);

  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_GET_PROFILE
  }/${id || user?.data?._id}`;

  // fetch profile
  const profileFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      console.log("API response data:", data);
      setProfile(data);
    } catch (error) {
      toast.error(error.message);
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch post count
  const fetchPostCount = async () => {
    try {
      setLoading(true);
      const response = await postCounter(author);

      if (!response.ok) {
        throw new Error("Failed to fetch post count");
      }

      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      toast.error(error.message);
      console.error("Post count error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.data?._id) {
      profileFetch();
      fetchPostCount();
    }
  }, [user, author]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your profile</p>
        <Link to="/login" className="text-indigo-600 ml-2">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={
                  profile?.data.profilePic ||
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="pt-20 pb-8 px-6 sm:px-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.data.username}
            </h1>
            <h3 className="text-gray-400">
              @{profile?.data.username || null}{" "}
            </h3>
            <p className="text-gray-500 mt-2">
              Member since{" "}
              {new Date(user.data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {count || 0}
                </p>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">1.2K</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">356</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={`/MyBlog/${author}`}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm"
              >
                View My Blog
              </Link>
              <Link
                to="/logout"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 shadow-sm"
              >
                Logout
              </Link>
            </div>

            <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">About Me</h3>
              <p className="text-gray-600">
                {profile?.data.AboutMe ||
                  "Passionate blogger sharing thoughts on technology, lifestyle, and creative writing."}
              </p>
            </div>

            {!profile ? (
              <div className="mt-6 flex justify-center">
                <Link
                  to={`/createProfile/${user.data._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Create your profile
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-start border-b border-gray-100 pb-4 last:border-0"
              >
                <img
                  src={`https://picsum.photos/seed/${item}/60/60`}
                  alt="Post thumbnail"
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-800">
                    Published a new post
                  </h3>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
