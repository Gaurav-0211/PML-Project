import { motion } from "framer-motion";
import { useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentApi, setCurrentApi] = useState("");

  // Inputs for APIs
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [startName, setStartName] = useState("");
  const [endName, setEndName] = useState("");
  const [updateUserDto, setUpdateUserDto] = useState({
    name: "",
    email: "",
  });

  // Generic GET API fetcher
  const fetchApi = async (endpoint, apiName = "") => {
    setLoading(true);
    setData(null);
    setCurrentApi(apiName);
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error(error);
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // PUT API (Update User)
  const updateUser = async () => {
    if (!id) return alert("Enter user ID first!");
    setLoading(true);
    setData(null);
    setCurrentApi("updateUser");
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUserDto),
      });
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // DELETE API (Delete User)
  const deleteUser = async () => {
    if (!id) return alert("Enter user ID first!");
    setLoading(true);
    setData(null);
    setCurrentApi("deleteUser");
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData({
          status: "SUCCESS",
          message: `User with id ${id} deleted successfully`,
        });
      } else {
        setData({ error: "Failed to delete user" });
      }
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Utility: check if data is array of objects (for table rendering)
  const isArrayOfObjects = (data) =>
    Array.isArray(data) && data.every((item) => typeof item === "object");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center text-purple-700 mb-10"
      >
        🚀 API Dashboard
      </motion.h1>

      {/* Inputs Section */}
      <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Start Name"
          value={startName}
          onChange={(e) => setStartName(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="End Name"
          value={endName}
          onChange={(e) => setEndName(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Update User Name"
          value={updateUserDto.name}
          onChange={(e) =>
            setUpdateUserDto({ ...updateUserDto, name: e.target.value })
          }
          className="p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Update User Email"
          value={updateUserDto.email}
          onChange={(e) =>
            setUpdateUserDto({ ...updateUserDto, email: e.target.value })
          }
          className="p-3 border rounded-lg"
        />
      </div>

      {/* API Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <button
          onClick={() => fetchApi("/api/users", "getAllPaged")}
          className="px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Get All Users in Pages
        </button>

        <button
          onClick={() => fetchApi("/api/users/orderBy-name", "orderByName")}
          className="px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Get Users Ordered By Name
        </button>

        <button
          onClick={() => fetchApi("/api/users/get-all", "getAll")}
          className="px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Get-All (Custom)
        </button>

        <button
          onClick={() => fetchApi("/api/users/by-date", "byDate")}
          className="px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Users by Date
        </button>

        {/* New APIs */}
        <button
          onClick={() => fetchApi(`/api/users/${id}`, "getById")}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get User By ID
        </button>

        <button
          onClick={updateUser}
          className="px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Update User
        </button>

        <button
          onClick={deleteUser}
          className="px-4 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Delete User
        </button>

        <button
          onClick={() =>
            fetchApi(`/api/users/get-all?name=${fullName}`, "getByName")
          }
          className="px-4 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Get Users By Name
        </button>

        <button
          onClick={() =>
            fetchApi(
              `/api/users/by-start-name?name=${startName}`,
              "byStartName"
            )
          }
          className="px-4 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
        >
          Get Users By Start Name
        </button>

        <button
          onClick={() =>
            fetchApi(`/api/users/by-end-name?name=${endName}`, "byEndName")
          }
          className="px-4 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
        >
          Get Users By End Name
        </button>
      </div>

      {/* API Result */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg overflow-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Result:</h2>

        {loading ? (
          <p className="text-purple-600 font-medium">⏳ Loading...</p>
        ) : data ? (
          data.error ? (
            <p className="text-red-500 font-medium">❌ {data.error}</p>
          ) : (
            <div className="space-y-6">
              {/* Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border rounded-lg shadow-sm">
                  <p className="text-gray-600 font-medium">Status:</p>
                  <p
                    className={`text-lg font-bold ${
                      data.status === "SUCCESS"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {data.status}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border rounded-lg shadow-sm">
                  <p className="text-gray-600 font-medium">Message:</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {data.message || data.response_message}
                  </p>
                </div>
              </div>

              {/* Show Success Only for Paged and ById */}
              {currentApi === "getAllPaged" || currentApi === "getById" ? (
                <p className="text-green-600 font-semibold">
                  ✅ Request completed successfully
                </p>
              ) : Array.isArray(data.data) && data.data.length > 0 ? (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      {Object.keys(data.data[0]).map((key) => (
                        <th key={key} className="px-4 py-2 border">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-100 transition text-center"
                      >
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="px-4 py-2 border">
                            {val?.toString()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No user data available</p>
              )}
            </div>
          )
        ) : (
          <p className="text-gray-500">Click on an API button to fetch data</p>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
