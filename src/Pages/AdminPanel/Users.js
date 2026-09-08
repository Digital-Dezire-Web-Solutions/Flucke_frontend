import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../../Redux/features/auth/authSlice";
import "./AdminTable.css";

const emptyUser = {
  name: "",
  email: "",
  phone: "",
  role: "customer",
  isBlocked: false,
  isVerified: false,
};

export default function Users() {
  const dispatch = useDispatch();

  const { users = [] } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(emptyUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = () => {
    dispatch(
      updateUser({
        id: selected._id,
        data: {
          name: selected.name,
          email: selected.email,
          phone: selected.phone,
          role: selected.role,
          isBlocked: selected.isBlocked,
          isVerified: selected.isVerified,
        },
      }),
    );

    setOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;

    dispatch(deleteUser(id));
  };

  return (
    <div className="admin-table-wrapper">
      <div className="table-header">
        <h2>Users</h2>

        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Blocked</th>
            {/* <th>Verified</th> */}
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>{user.role}</td>

              <td>{user.isBlocked ? "Yes" : "No"}</td>

              {/* <td>{user.isVerified ? "Yes" : "No"}</td> */}

              <td>{new Date(user.createdAt).toLocaleDateString()}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelected(user);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Edit User</h3>

            <input
              placeholder="Name"
              value={selected.name}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={selected.email}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone"
              value={selected.phone}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  phone: e.target.value,
                })
              }
            />

            <select
              value={selected.role}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  role: e.target.value,
                })
              }
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={selected.isBlocked}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    isBlocked: e.target.checked,
                  })
                }
              />
              Block User
            </label>

            {/* <label>
              <input
                type="checkbox"
                checked={selected.isVerified}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    isVerified: e.target.checked,
                  })
                }
              />
              Verified
            </label> */}

            <div className="modal-actions">
              <button onClick={() => setOpen(false)}>Cancel</button>

              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
