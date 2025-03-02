import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { use } from "react";

const Alluser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserService.getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleChangeRole = (email) => {
    UserService.getRoleByEmail(email).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserService.makeUser(email).then(() => {
          setUsers(
            users.map((user) => {
              if (user.email === email) {
                user.role = "user";
              }
              return user;
            })
          );
        });
      } else {
        UserService.makeAdmin(email).then(() => {
          setUsers(
            users.map((user) => {
              if (user.email === email) {
                user.role = "admin";
              }
              return user;
            })
          );
        });
      }
    });
  };
  return (
    <div className="w-screen max-w-full overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>_id</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td className="flex m-2">
                  <p>User</p>
                  <input
                    type="checkbox"
                    className="toggle toggle-error mr-2 ml-2"
                    onClick={() => handleChangeRole(user.email)}
                    checked={user.role === "admin"}
                  />
                  <p>Admin</p>
                </td>
                <td>{user._id}</td>
                <td>
                  <button className="btn btn-sm btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>_id</th>
              <th>#</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Alluser;
