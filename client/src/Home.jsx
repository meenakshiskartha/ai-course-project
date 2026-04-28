import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const bg1 = document.getElementById("bg1");
    const bg2 = document.getElementById("bg2");

    const move = (e) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`;
      }

      const x = e.clientX / 50;
      const y = e.clientY / 50;

      if (bg1) bg1.style.transform = `translate(${x}px, ${y}px)`;
      if (bg2) bg2.style.transform = `translate(-${x}px, -${y}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);


  return (
    <div className="relative min-h-[85vh] bg-black text-white">

      {/* Floating Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full float-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Cursor Glow */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-[70px] h-[70px] rounded-full bg-blue-500/20 blur-2xl"
      ></div>

      {/* Background Glow */}
      <div id="bg1" className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px] z-0"></div>
      <div id="bg2" className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px] z-0"></div>

      <div className="relative z-10">

       {/* Navbar */}
       <div
  className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 
  transition-all duration-300
  ${scrolled 
    ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg" 
    : "bg-transparent"}
`}
>

  {/* LOGO */}
  <h1 className="text-white font-semibold text-lg">
    AI Workshop
  </h1>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-6">

    {/* Contact */}
    <button
      onClick={() => {
        document.getElementById("contact").scrollIntoView({
          behavior: "smooth"
        });
      }}
      className="text-gray-300 hover:text-white transition"
    >
      Contact
    </button>

    {/* Login */}
    <button
      onClick={() => navigate("/login")}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90 transition"
    >
      Login
    </button>

  </div>

</div>


        

        {/* Hero */}
        <div className="flex flex-col items-center justify-center text-center min-h-screen px-4">

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            3 Hours Live{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              AI Tools
            </span>{" "}
            Workshop
          </h1>

          <p className="text-gray-400 max-w-xl mb-8">
            Learn powerful AI tools and boost your productivity in just 3 hours.
          </p>

          {/* FIXED BUTTON */}
          <button
  onClick={() => navigate("/register")}
   className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
            hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] 
            transition duration-300"
>
  Get Started
</button>

        </div>
       {/* 🎬 DEMO SECTION */}
<div className="py-20 text-center">

  {/* Title */}
  <h2 className="text-3xl font-bold mb-4">
    🎬 Free Demo Class
  </h2>

  {/* Subtitle */}
  <p className="text-gray-400 mb-10">
    See how the workshop works before enrolling
  </p>

  {/* Video Box */}
  <div className="flex justify-center">
    <div className="w-full md:w-[70%] bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur">

      <iframe
        className="w-full h-[350px] md:h-[400px] rounded-lg"
        src="https://www.youtube.com/embed/2ePf9rue1Ao"
        title="Demo Class"
        allowFullScreen
      ></iframe>

    </div>
  </div>

  {/* Description */}
  <div className="mt-6 text-gray-400 text-sm max-w-xl mx-auto">

    <p className="mb-2">
      In this demo, you’ll learn how AI tools can automate tasks,
      boost productivity, and save hours of work.
    </p>

    <p>
      This is just a preview of what you’ll master in the full workshop.
    </p>


  </div>
  <div className="mt-6 text-center max-w-md mx-auto text-gray-300 text-sm">

  <p className="mb-3 font-semibold text-white">
    What you'll learn:
  </p>

  <ul className="space-y-2">
    <li>✔ Using ChatGPT effectively</li>
    <li>✔ Automating daily tasks</li>
    <li>✔ AI tools for productivity</li>
  </ul>

</div>

  {/* CTA Button */}
  <button
    onClick={() => navigate("/register")}
    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90 transition"
  >
    Enroll Now
  </button>

</div>
        {/* Features */}
       <div data-aos="fade-up" className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

  {/* Card 1 */}
  <div data-aos="zoom-in" className="p-6 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 
  hover:scale-105 hover:border-blue-500/30 
  hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] 
  transition duration-300">
    <h3 className="text-xl font-semibold mb-2">AI Tools Mastery</h3>
    <p className="text-gray-400 text-sm">Learn ChatGPT & automation</p>
  </div>

  {/* Card 2 */}
  <div data-aos="zoom-in" data-aos-delay="100" className="p-6 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 
  hover:scale-105 hover:border-blue-500/30 
  hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] 
  transition duration-300">
    <h3 className="text-xl font-semibold mb-2">Live Interactive</h3>
    <p className="text-gray-400 text-sm">Hands-on workshop</p>
  </div>

  {/* Card 3 */}
  <div data-aos="zoom-in" data-aos-delay="200" className="p-6 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 
  hover:scale-105 hover:border-blue-500/30 
  hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] 
  transition duration-300">
    <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
    <p className="text-gray-400 text-sm">Boost productivity</p>
  </div>

</div>

      
      {/* 🔹 Testimonials */}
      <div className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-12">
          What Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div data-aos="fade-up" className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:scale-105 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition duration-300">
            <p className="text-gray-400 text-sm mb-4">
              "This workshop completely changed how I use AI tools. Super helpful!"
            </p>
            <h4 className="font-semibold">Anjali</h4>
          </div>

          <div data-aos="fade-up" className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:scale-105 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition duration-300">
            <p className="text-gray-400 text-sm mb-4">
              "I learned automation in just 3 hours. Worth every rupee!"
            </p>
            <h4 className="font-semibold">Rahul</h4>
          </div>

          <div data-aos="fade-up" className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:scale-105 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition duration-300">
            <p className="text-gray-400 text-sm mb-4">
              "Very practical and easy to understand. Highly recommended."
            </p>
            <h4 className="font-semibold">Sneha</h4>
          </div>

        </div>
        </div>
        </div>
    

     {/* footer */}
     <div id="contact" className="bg-[#010409]border-t border-white/10 mt-16">
     <div id="contact" className="bg-[#010409] relative z-20">

  <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">

    {/* LEFT - BRAND */}
    <div>
      <h2 className="text-white text-lg font-semibold mb-2">
        ⚡ AI Workshop
      </h2>
      <p className="text-sm">
        Learn powerful AI tools and boost your productivity in just 3 hours.
      </p>
    </div>

    {/* CENTER - LINKS */}
    <div>
      <h3 className="text-white mb-3 font-medium">Quick Links</h3>
      <div className="flex flex-col gap-2 text-sm">

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-white text-left"
        >
          Home
        </button>

        <button
          onClick={() => {
            document.getElementById("contact").scrollIntoView({
              behavior: "smooth"
            });
          }}
          className="hover:text-white text-left"
        >
          Contact
        </button>

      </div>
    </div>

    {/* RIGHT - CONTACT */}
    <div>
      <h3 className="text-white mb-3 font-medium">Contact</h3>

      <div className="flex flex-col gap-2 text-sm">

        <a
          href="mailto:aiworkshop@gmail.com"
          className="hover:text-blue-400"
        >
          📧 aiworkshop@gmail.com
        </a>

        <a
          href="tel:9876543210"
          className="hover:text-blue-400"
        >
          📞 9876543210
        </a>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          💬 WhatsApp
        </a>

      </div>
    </div>

  </div>

  {/* BOTTOM LINE */}
  <div className="text-center text-gray-500 text-sm border-t border-white/10 py-4">
    © 2026 AI Workshop. All rights reserved.
  </div>
  </div>
  </div>
  </div>
  

    
  );
}

export default Home;