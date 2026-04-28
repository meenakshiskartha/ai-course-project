import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { createPortal } from "react-dom";


function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user?.isAdmin) {
    navigate("/login");
  }
}, []);
useEffect(() => {
  fetch("http://localhost:5000/dashboard")
    .then(res => res.json())
    .then(data => {
      setStats(data);
    });
}, []);

const [users, setUsers] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/admin/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data.users);
    });
}, []);
  const [open, setOpen] = useState(false);
 const [stats, setStats] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");
const [openDropdown, setOpenDropdown] = useState(false);
 

  const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
];

 useEffect(() => {
  fetch("http://localhost:5000/dashboard", {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
})
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data); // check
      setStats(data);
    });
}, []);
useEffect(() => {
  const close = () => setOpenDropdown(false);

  window.addEventListener("click", close);

  return () => window.removeEventListener("click", close);
}, []);
const filteredUsers = users.filter((u) => {
  const matchSearch =
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase());

  if (filter === "paid") return u.paid && matchSearch;
  if (filter === "unpaid") return !u.paid && matchSearch;

  return matchSearch;
});
 return (
    
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">

        <h1 className="text-xl font-semibold text-blue-400 mb-10">
          ⚡ Be10X
        </h1>

        <nav className="space-y-4 text-gray-300">
          <p className="hover:text-white cursor-pointer">Dashboard</p>
          <p className="hover:text-white cursor-pointer">Analytics</p>
          <p className="hover:text-white cursor-pointer">Settings</p>
        </nav>

      </div>

      {/* 🔥 MAIN AREA */}
      <div className="flex-1">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl overflow-visible">

          <h2 className="text-lg font-semibold">
            Welcome, {user?.name} 👋
          </h2>

          {/* Profile */}
          <div className="relative overflow-visible">
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center cursor-pointer"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
{open &&
  createPortal(
    <div className="fixed top-20 right-6 w-48 bg-[#020617] border border-white/10 rounded-xl shadow-lg z-[9999]">

      <p className="px-4 py-2 text-sm text-gray-400 border-b border-white/10">
        {user?.email}
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("currentUser");
          setOpen(false);
          navigate("/login");
        }}
        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
      >
        Logout
      </button>

    </div>,
    document.body
  )
}
          </div>

        </div>

        {/* 🔥 DASHBOARD CONTENT */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <h3 className="text-xl mb-2">Users</h3>
            <p className="text-gray-400">
  {stats ? `${stats.users} Active Users` : "Loading..."}
</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <h3 className="text-xl mb-2">Revenue</h3>
           <p className="text-gray-400">
  {stats ? `$${stats.revenue} this month` : "Loading..."}
</p>
          </div>
{/*card 3*/}
<div className="p-6 bg-white/5 rounded-xl border border-white/10">
  <h3 className="text-xl mb-2">Paid Users</h3>
  <p>{stats ? stats.paidUsers : "Loading..."}</p>
</div>
</div>
<div className="p-8">
  <h3 className="text-xl mb-4">Registered Users</h3>
 <div className="flex flex-col md:flex-row items-center gap-4 mb-6">

  {/* Search */}
  <input
    type="text"
    placeholder="Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="p-3 bg-white/10 rounded w-full md:w-2/3"
  />

  {/* Filter */}
  <div className="relative w-full md:w-1/3">

  {/* Button */}
  <div
  onClick={(e) => {
    e.stopPropagation();
    setOpenDropdown(!openDropdown);
  }}
  className="p-3 bg-white/10 rounded cursor-pointer flex justify-between items-center"
>
    <span>
      {filter === "all" && "All Users"}
      {filter === "paid" && "Paid Users"}
      {filter === "unpaid" && "Unpaid Users"}
    </span>
    <span>▼</span>
  </div>

  {/* Dropdown */}
  {openDropdown && (
    <div className="absolute top-14 left-0 w-full bg-[#020617] border border-white/10 rounded shadow-lg z-50">

      <div
        onClick={() => {
          setFilter("all");
          setOpenDropdown(false);
        }}
        className="p-3 hover:bg-white/10 cursor-pointer"
      >
        All Users
      </div>

      <div
        onClick={() => {
          setFilter("paid");
          setOpenDropdown(false);
        }}
        className="p-3 hover:bg-white/10 cursor-pointer"
      >
        Paid Users
      </div>

      <div
        onClick={() => {
          setFilter("unpaid");
          setOpenDropdown(false);
        }}
        className="p-3 hover:bg-white/10 cursor-pointer"
      >
        Unpaid Users
      </div>

    </div>
  )}

</div>

</div>
 <div className="w-full">
 <table className="w-full text-left border border-white/10 rounded-lg overflow-hidden">

  <thead>
    <tr className="bg-white/10 text-gray-300">
      <th className="p-3">Name</th>
      <th className="p-3">Email</th>
      <th className="p-3 text-center">Paid</th>
    </tr>
  </thead>

  <tbody>
    {filteredUsers.map((u, i) => (
      <tr
        key={i}
        className="border-t border-white/10 hover:bg-white/5 transition"
      >
        <td className="p-3">{u.name}</td>
        <td className="p-3">{u.email}</td>
        <td className="p-3 text-center">
          {u.paid ? (
  <span className="text-green-400 font-medium">Paid</span>
) : (
  <span className="text-red-400 font-medium"> Unpaid</span>
)}
        </td>
      </tr>
    ))}
  </tbody>

</table>
{filteredUsers.length === 0 && (
  <p className="text-gray-400 mt-4">No users found</p>
)}
</div>
          </div>
          
</div>

        </div>



  );
}

export default Dashboard;