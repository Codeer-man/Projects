const API_URL = "http://localhost:5000";

export const fetchBlog = async () => {
  try {
    const response = await fetch(
      `${API_URL}${import.meta.env.VITE_GETALL_POST}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `http://localhost:5000/api/blog/getPostbyId/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${API_URL}${import.meta.env.VITE_SINGLE_BLOG_POST}/${author}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("coulld not get the author data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error("Invalid server error", error);
  }
};

export const postCounter = async (author) => {
  try {
    const count = await fetch(
      `${API_URL}${import.meta.env.VITE_POST_COUNTER_POST}/${author}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!count.ok) {
      throw new Error("couldnot count or get the count data");
    }
    return count;
  } catch (error) {
    console.error("Invalid serve error");
    throw new Error(error);
  }
};
