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

export const fetchSingleBlog = async () => {
  try {
    const response = await fetch(`${API_URL}/getPostbyId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Couldn't get post");
    }
  } catch (error) {
    console.log("Failed to get post", error);
    return null;
  }
};


