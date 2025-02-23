import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Post() {
  const { id } = useParams();
  const [blogPost, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blog/getPostbyId/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data.data);
          setData(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        console.error(data.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  const DeletePost = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setData((prevdata) => {
          prevdata.filter((user) => user.id !== _id);
          console.log("data has been deleted");
        });
      }
    } catch (error) {
      console.log("Error deleting data", error);
      console.error(error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner/>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}
    >
      <div className=" row no-gutters">
        <div className="col-md-4">
          <img
            src={blogPost.imageUrl || "/default-blog-image.jpg"}
            className="card-img"
            alt="Blog Post"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blogPost.title}</h5>
            <p className="card-text">{blogPost.content}</p>
            <div className="card-footer bg-transparent">
              <small className="text-muted">
                Posted by {blogPost.author} on{" "}
                {new Date(blogPost.createdAt).toLocaleDateString()}
              </small>
            </div>
            <button onClick={() => DeletePost(id)}>Delete</button> <br />
            <Link to={`/api/blog/${id}/update`}>Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
