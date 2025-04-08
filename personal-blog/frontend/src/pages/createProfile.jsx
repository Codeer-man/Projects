import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../store/auth";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileForm() {
  const { id } = useParams();
  const { authorizeToken } = useAuth();
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    username: "",
    AboutMe: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log();

  const api_url = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_CREATE_PROFILE
  }/${id}`;
  const api_url1 = "http://localhost:5000/api/profile/create";

  const MakeProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("username", create.username);
    formdata.append("AboutMe", create.AboutMe);
    if (image) {
      formdata.append("profileImage", image);
    }

    try {
      const response = await fetch(`${api_url1}/${id}`, {
        method: "POST",
        headers: {
          Authorization: authorizeToken,
        },
        body: formdata,
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create profile");
      }

      toast.success("Profile created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setCreate((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const prevImage = URL.createObjectURL(file);
      setPreview(prevImage);
      return () => URL.revokeObjectURL(prevImage);
    }
  }

  useEffect(() => {
    if (!id) {
      toast.error("ID not found", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/"), 1500);
    }
  }, [id, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Create Profile</h2>

      <form onSubmit={MakeProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={create.username}
            name="username"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">About Me</label>
          <textarea
            placeholder="About Me"
            value={create.AboutMe}
            name="AboutMe"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {preview && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}
