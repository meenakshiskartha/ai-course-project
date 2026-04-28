import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRules = {
    length: form.password.length >= 8,
    capital: /^[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };

  const isMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.capital &&
    passwordRules.number &&
    passwordRules.symbol;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

const handleRegister = async () => {
  if (!passwordRules.length) return setError("Minimum 8 characters required");
  if (!passwordRules.capital) return setError("First letter must be capital");
  if (!passwordRules.number) return setError("Include a number");
  if (!passwordRules.symbol) return setError("Include a symbol");
  if (!isMatch) return setError("Passwords do not match");

  try {
    setLoading(true);
    setError("");

    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    // ✅ ADD THIS BLOCK
    if (!data.success) {
      setError(data.message);   // 👈 THIS SHOWS "User already exists"
      return;
    }

    // ✅ SUCCESS
    toast.success("Account created successfully");

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/purchase");

  } catch (err) {
    console.log(err);
    setError("Server not responding");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden">

      {/* Background */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px]"></div>

      <div className="relative z-10 w-[360px] p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">

        <div className="p-8 rounded-2xl bg-[#020617]/90 backdrop-blur-xl text-white">

          <h2 className="text-2xl mb-6 text-blue-400 text-center">⚡ Register</h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
           className="w-full px-4 py-3 mb-3 pr-12 rounded-xl bg-[#1e293b] text-white outline-none border border-gray-600
focus:border-blue-500 focus:ring-0 focus:ring-blue-500/10
focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]
transition duration-300"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 pr-12 rounded-xl bg-[#1e293b] text-white outline-none border border-gray-600
focus:border-blue-500 focus:ring-0 focus:ring-blue-500/10
focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]
transition duration-300"
          />

          {/* Password */}
          <div className="relative mb-5">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter Password"
    value={form.password}
    onChange={handleChange}
    onFocus={() => setShowRules(true)}
    onBlur={() => setTimeout(() => setShowRules(false), 200)}
    className="w-full px-4 py-3 pr-12 rounded-xl bg-[#1e293b] text-white outline-none border border-gray-600
focus:border-blue-500 focus:ring-0 focus:ring-blue-500/10
focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]
transition duration-300"
  />

  {/* SINGLE SVG ICON */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {showPassword ? (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M3 3l18 18" />
      </svg>
    ) : (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.542 7" />
      </svg>
    )}
  </button>
</div>

          {/* Rules */}
          {showRules && (
            <div className="text-xs text-left mb-3 space-y-1">
              <p className={`${passwordRules.length ? "text-green-400" : "text-gray-400"}`}>
                {passwordRules.length ? "✔" : "•"} 8+ characters
              </p>
              <p className={`${passwordRules.capital ? "text-green-400" : "text-gray-400"}`}>
                {passwordRules.capital ? "✔" : "•"} Starts with capital
              </p>
              <p className={`${passwordRules.number ? "text-green-400" : "text-gray-400"}`}>
                {passwordRules.number ? "✔" : "•"} Contains number
              </p>
              <p className={`${passwordRules.symbol ? "text-green-400" : "text-gray-400"}`}>
                {passwordRules.symbol ? "✔" : "•"} Contains symbol
              </p>
            </div>
          )}

          {/* Confirm Password */}
         <div className="relative mb-5">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={form.confirmPassword}
    onChange={handleChange}
    className={`w-full px-4 py-3 pr-12 rounded-xl bg-[#1e293b] text-white outline-none border transition duration-300
${
  form.confirmPassword.length === 0
    ? "border-gray-600 focus:border-blue-500 focus:ring-0 focus:ring-blue-500/10 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    : isMatch
    ? "border-green-500"
    : "border-red-500"
}`}
  />

  {/* SINGLE SVG ICON */}
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {showConfirmPassword ? (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M3 3l18 18" />
      </svg>
    ) : (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M15 12a3 3 0 11-6 0" />
        <path strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.542 7" />
      </svg>
    )}
  </button>
</div>
          

          {/* Error */}
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          {/* Button */}
          <button
  onClick={handleRegister}
  disabled={!isMatch || !isPasswordValid || loading}
  className={`w-full py-3 mt-3 rounded-lg font-semibold
  ${isMatch && isPasswordValid ? "bg-blue-500" : "bg-gray-600 cursor-not-allowed"}`}
>
  {loading ? "Creating Account..." : "Register"}
</button>

        </div>
      </div>
    </div>
  );
}

export default Register;