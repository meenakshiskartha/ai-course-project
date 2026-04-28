import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);

          // calculate revenue
          const paidUsers = data.users.filter((u) => u.paid);
          setTotalRevenue(paidUsers.length * 999);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="p-4 bg-white/5 rounded-lg">
          <p>Total Users</p>
          <h2 className="text-2xl">{users.length}</h2>
        </div>

        <div className="p-4 bg-white/5 rounded-lg">
          <p>Paid Users</p>
          <h2 className="text-2xl">
            {users.filter((u) => u.paid).length}
          </h2>
        </div>

        <div className="p-4 bg-white/5 rounded-lg">
          <p>Total Revenue</p>
          <h2 className="text-2xl">₹{totalRevenue}</h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white/5 rounded-lg overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.paid ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <span className="text-red-400">Not Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;