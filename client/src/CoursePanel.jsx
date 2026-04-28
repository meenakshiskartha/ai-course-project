import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function CoursePanel() {
  const [selectedVideo, setSelectedVideo] = useState(
    "https://www.youtube.com/embed/2ePf9rue1Ao"
  );

  const lessons = [
    { title: "Introduction to AI Tools", video: "https://www.youtube.com/embed/2ePf9rue1Ao" },
    { title: "Using ChatGPT", video: "https://www.youtube.com/embed/JTxsNm9IdYU" },
    { title: "Automation Basics", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
  ];

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    navigate("/login");
  } else if (!user.paid) {
    navigate("/purchase");
  }
}, [navigate]);

  const addComment = () => {
  if (!text.trim()) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  fetch("http://localhost:5000/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      text,
    }),
  });

  setComments([...comments, { text }]);
  setText("");
};
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  fetch(`http://localhost:5000/comment/${user.email}`)
    .then(res => res.json())
    .then(data => {
      setComments(data.comments || []);
    });
}, []);

  return (
    <div className="min-h-screen bg-black text-white flex">

     {/* LEFT - LESSON LIST */}
<div className="w-64 border-r border-white/10 p-4">
  <h2 className="mb-4 font-semibold">Lessons</h2>

  {lessons.map((lesson, i) => (
    <div
      key={i}
      onClick={() => {
        setSelectedVideo(lesson.video);

        let updated = completed;

        if (!completed.includes(i)) {
          updated = [...completed, i];
          setCompleted(updated);
        }

        const user = JSON.parse(localStorage.getItem("currentUser"));

        fetch("http://localhost:5000/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            progress: updated,
          }),
        });
      }}
      className={`p-2 mb-2 rounded cursor-pointer 
      ${
        completed.includes(i)
          ? "bg-green-500/20 border border-green-500"
          : "bg-white/5 hover:bg-white/10"
      }`}
    >
      {lesson.title}
    </div>
  ))}
</div>
     {/* CENTER - VIDEO */}
<div className="flex-1 p-6">

  {/* Progress Bar */}
  <div className="mb-4">
    <p className="text-sm mb-1">
      Progress: {Math.round((completed.length / lessons.length) * 100)}%
    </p>

    <div className="w-full bg-white/10 h-2 rounded">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{
          width: `${(completed.length / lessons.length) * 100}%`
        }}
      ></div>
    </div>
  </div>

  {/* Video */}
  <iframe
    className="w-full h-[400px] rounded-lg"
    src={selectedVideo}
    title="Course Video"
    allowFullScreen
  ></iframe>

</div>


      {/* RIGHT - COMMENTS */}
      <div className="w-72 border-l border-white/10 p-4">
        <h2 className="mb-4 font-semibold">Comments</h2>

        <div className="space-y-2 mb-4">
          {comments.map((c, i) => (
            <p key={i} className="text-sm bg-white/5 p-2 rounded">
              {c}
            </p>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 bg-white/10 rounded mb-2"
        />

        <button
          onClick={addComment}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Send
        </button>
      </div>
</div>
  );
}

export default CoursePanel;