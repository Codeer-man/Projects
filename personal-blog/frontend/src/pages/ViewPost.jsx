import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleBlog } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ViewPost() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await fetchSingleBlog(id);
        console.log("response", response);

        setBlog(response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!blog) return <p>Blog not found</p>;
  console.log("Blog state:", blog);

  const handleGoback = () => {
    navigate(-1);
  };
  return (
    <div className=" mt-6 w-screen flex justify-center">
      <div className=" w-2xl flex flex-col items-center justify-center gap-5  border-4 rounded-2xl p-3">
        <img src={blog.url} alt="blogurl" width={500} height={700} />
        <div className="flex items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug md:leading-tight tracking-tight">
            {blog.title}
          </h1>
        </div>

        <div className="p-2 text-2 leading-snug text-gray-700">
          {blog.content}
        </div>
        <div className="text-[15px] font-normal">
          {" "}
          Publish Data: {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <button
          onClick={handleGoback}
          className="bg-black text-white p-2 rounded-sm hover:bg-gray-700"
          to={"/blog-post"}
        >
          Go Back{" "}
        </button>
      </div>
    </div>
  );
}
