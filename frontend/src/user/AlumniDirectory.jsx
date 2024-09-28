import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../store";
import { API } from "../../config";

const AlumniDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/user/users`, {
          withCredentials: true,
        });
        setUsers(response?.data?.users);
        setLoading(false);
        console.log("Users: ", response?.data?.users);
      } catch (err) {
        setError("Failed to load users.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="container my-16 mx-auto px-4 md:px-12 pb-7">
        <div className="grid">
          {loading ? (
            <div className="flex items-center justify-center min-h-[70vh] mx-auto">
              <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center w-full">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : users?.length === 0 ? (
            <div className="text-center w-full">
              <p className="text-xl">No users found!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mx-6">
              {users?.map((user) => (
                <div key={user?.id} className="bg-white rounded-lg shadow-lg ">
                  <Link to={`/userDetail/${user?.id}`}>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <img
                        alt="Placeholder"
                        className="block w-full h-[250px] object-cover"
                        src={
                          user?.image ||
                          `https://ui-avatars.com/api/?name=${user?.name}&background=F67280&color=fff`
                        }
                      />
                      <div className="p-4">
                        <h1 className="text-lg font-semibold">{user?.name}</h1>
                        <p className="text-gray-500 font-semibold text-sm mt-2">
                          {user?.role === "STUDENT" || user?.role === "ALUMNI"
                            ? `${user?.role}, ${user?.student?.joiningYear} - ${user?.student?.passingYear}`
                            : user?.role === "FACULTY" &&
                              `${user?.role}, ${user?.faculty?.joiningYear} - ${user?.faculty?.leftYear}`}
                        </p>
                        <p className="text-gray-500 font-semibold text-sm">
                          {user?.student?.branch ||
                            user?.faculty?.department ||
                            "Department"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlumniDirectory;
