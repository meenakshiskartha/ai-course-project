import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // SEND OTP
  const sendOtp = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email?.trim().toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (!user) {
      return setError("Email not found");
    }

    const generatedOtp = "1234";
    setOtp(generatedOtp);
    setOtpSent(true);

    alert("OTP is 1234");
  };

  // RESET PASSWORD
  const resetPassword = () => {
    if (enteredOtp !== otp) {
      return setError("Invalid OTP");
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email?.trim().toLowerCase() ===
      email.trim().toLowerCase()
        ? { ...u, password: newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password reset successful!");
  navigate("/login");
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full top-[-150px] left-[-150px]"></div>
    <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px]"></div>

    {/* Gradient Border Card */}
    <div className="relative z-10 w-[350px] p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">

      {/* Glass Card */}
      <div className="p-8 rounded-2xl bg-[#020617]/90 backdrop-blur-xl border border-white/10 text-white">

        <h2 className="text-2xl mb-6 text-blue-400 text-center">
          Reset Password
        </h2>

        {!otpSent ? (
          <>
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-[#1e293b] text-white border border-gray-600 focus:border-blue-500 outline-none"
            />

            <button
              onClick={sendOtp}
              className="w-full py-3 rounded-lg bg-blue-500 hover:scale-105 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            {/* OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-full px-4 py-3 mb-3 rounded-xl bg-[#1e293b] text-white border border-gray-600"
            />

            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-[#1e293b] text-white border border-gray-600"
            />

            <button
              onClick={resetPassword}
              className="w-full py-3 rounded-lg bg-green-500 hover:scale-105 transition"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}

        {/* Back */}
        <p
          onClick={() => navigate("/login")}
          className="mt-4 text-sm text-gray-400 text-center cursor-pointer hover:text-white"
        >
          Back to Login
        </p>

      </div>
    </div>
  </div>
);
}

export default ResetPassword;