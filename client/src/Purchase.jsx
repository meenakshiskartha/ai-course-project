import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Purchase() {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE - COURSE DETAILS */}
        <div>

          <h1 className="text-4xl font-bold mb-4">
            🚀 AI Tools Mastery Workshop
          </h1>
          <p className="text-yellow-400 mb-2">
  ⭐ 4.8/5 (2,100+ students)
</p>
<div className="flex gap-3 text-sm text-gray-400 mb-4">
  <span>⏱ 3 Hours</span>
  <span>👨‍💻 Beginner Friendly</span>
  <span>📜 Certificate</span>
</div>

          <p className="text-gray-400 mb-6">
            Learn powerful AI tools like ChatGPT, automation workflows, and productivity hacks in just 3 hours.
          </p>

          {/* Highlights */}
          <ul className="space-y-3 text-gray-300 mb-6">
            <li>✔ 3 Hours Live Workshop</li>
            <li>✔ Hands-on AI Tools Training</li>
            <li>✔ Real-world Use Cases</li>
            <li>✔ Lifetime Recording Access</li>
            <li>✔ Certificate of Completion</li>
          </ul>

          {/* Instructor */}
          <p className="text-sm text-gray-500">
            👨‍🏫 Instructor: Industry AI Expert
          </p>

        </div>

        {/* RIGHT SIDE - PAYMENT CARD */}
        <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur">

          <h2 className="text-2xl font-semibold mb-4">
            Enroll Now
          </h2>

          <p className="text-gray-400 mb-2">Course Price</p>
          <p className="text-red-400 text-sm mb-2">
  🔥 Limited seats available
</p>

          <p className="text-gray-400 line-through">₹2999</p>
<h3 className="text-4xl font-bold mb-2">₹999</h3>
<p className="text-green-400 text-sm mb-4">67% OFF</p>

          {/* Button */}
         <button
  disabled={loading}   // ✅ HERE
  onClick={async () => {
    setLoading(true);  // ✅ start loading

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment successful");
        navigate("/login");
      } else {
        alert("Payment failed");
      }

    } catch {
      alert("Server error");
    }

    setLoading(false); // ✅ stop loading
  }}
  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] 
            transition duration-300"
>
           
  {loading ? "Processing..." : "Pay Now"}   {/* ✅ TEXT CHANGE */}
</button>

          {/* Trust */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Secure Payment | Instant Access
          </p>

        </div>

      </div>
    </div>
  );
}

export default Purchase;