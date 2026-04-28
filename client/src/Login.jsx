import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  
  

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
useEffect(() => {
  setForm({ email: "", password: "" });
}, []);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "user_email") {
    setForm({ ...form, email: value });
  } else if (name === "user_password") {
    setForm({ ...form, password: value });
  }

  setError("");
};

  const handleClick = (e) => {
    const ripple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 500);
  };
const handleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    console.log("LOGIN DATA:", data);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      if (data.user.isAdmin) {
        navigate("/dashboard");
      } else if (data.user.paid) {
        navigate("/course");
      } else {
        navigate("/purchase");
      }
    } else {
      setError("Email or password is incorrect");
    }

  } catch (err) {
    console.log(err);
    setError("Server not responding");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onClick={handleClick}
      className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px]"></div>

      {/* Cursor Glow */}
      <div
        className="pointer-events-none absolute w-10 h-10 bg-blue-500/20 rounded-full blur-xl"
        style={{ left: pos.x - 30, top: pos.y - 30 }}
      ></div>

      {/* Ripple Effect */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute w-10 h-10 border border-blue-400 rounded-full animate-ping"
          style={{ left: r.x - 20, top: r.y - 20 }}
        ></span>
      ))}

      {/* Card Border */}
      <div className="relative z-10 w-[350px] p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">

        {/* Card Content */}
        <div className="p-8 rounded-2xl bg-[#020617]/90 backdrop-blur-xl border border-white/10 text-white">

          <h2 className="text-2xl mb-6 text-blue-400 text-center">
            ⚡ Be10X Login
          </h2>
<input type="text" name="username" autoComplete="username" style={{ display: "none" }} />
<input type="password" name="password" autoComplete="current-password" style={{ display: "none" }} />

          {/* Email */}
          <input
  type="email"
  name="user_email"
  autoComplete="new-password"
  placeholder="Enter Email"
  value={form.email}
  onChange={handleChange}
 
            className={`w-full px-4 py-3 mb-4 rounded-xl bg-[#1e293b] text-white outline-none border 
${error ? "border-red-500" : "border-gray-600"}
focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]
transition duration-300`}
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
  type={showPassword ? "text" : "password"}
  name="user_password"
   placeholder="Enter Password"
  autoComplete="new-password"
 value={form.password}
  onChange={handleChange}
  className={`w-full px-4 py-3 pr-12 rounded-xl bg-[#1e293b] text-white outline-none border 
${error ? "border-red-500" : "border-gray-600"}
focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]
transition duration-300`}
            />
            {error && (
  <p className="text-red-400 text-sm mt-2">{error}</p>
)}

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
            >
              {showPassword ? (
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 3l18 18" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M15 12a3 3 0 11-6 0" />
                  <path strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.542 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <p
            className="text-sm text-blue-400 mt-2 cursor-pointer text-right"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>
         
          {/* Login Button */}
          <button
  onClick={handleLogin}
  disabled={loading || !form.email || !form.password}
  className="w-full py-3 mt-4 rounded-lg bg-blue-500 hover:scale-105 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
>
  {loading ? "Logging in..." : "Login"}
</button>

          {/* Register */}
          <p className="text-sm text-gray-400 mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;