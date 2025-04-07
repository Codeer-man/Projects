import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Admin() {
  const navigate = useNavigate();
  const { user, loggedIn, authorizeToken } = useAuth();
  const [users, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      toast.error("Please login first");
    } else if (user?.data?.role !== "Admin") {
      navigate("/");
      toast.error("Only admin are allowed in the page");
    }
  }, [loggedIn, navigate, user]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/auth/users", {
          method: "GET",
          headers: {
            Authorization: authorizeToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();
        setAllUser(data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    if (loggedIn && user.data.role === "Admin") {
      getAllUsers();
    }
  }, [loggedIn, user, authorizeToken]);

  if (!loggedIn || user?.data?.role !== "Admin") return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              User List
            </h2>

            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "Admin"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
