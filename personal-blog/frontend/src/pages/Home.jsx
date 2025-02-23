import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export default function Home() {
  const { postData } = useAuth();

  // console.log(postData);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 ">Latest Blog Posts</h2>
      <div className="row">
        {postData && postData.length > 0 ? (
          postData.map((post) => (
            <div key={post._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted small mb-2">
                    By {post.author}
                  </p>
                  <p className="card-text text-muted small mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text text-truncate">{post.content}</p>
                  <Link
                    to={`/posts/${post._id}`}
                    className="btn btn-primary btn-sm mt-2"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </div>
  );
}
