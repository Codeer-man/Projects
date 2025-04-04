const API_URL = "http://localhost:5000/api";

export const fetchBlog = async () => {
  try {
    const response = await fetch(`${API_URL}/blog/getpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Couldn't get post");
    }
    return response.json();
  } catch (error) {
    console.log("Failed to get post", error);
    return null;
  }
};

export const fetchSingleBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blog/getPostbyId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Could not get post ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Failed to get post", error);
    return null;
  }
};

export const userBlog = async (author) => {
  try {
    const response = await fetch(`${API_URL}/blog/myBlog/${author}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("coulld not get the author data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error("Invalid server error", error);
  }
};
