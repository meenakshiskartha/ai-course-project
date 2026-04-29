const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey"; 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB ERROR:", err));

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());


// ✅ dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;
    const paidUsers = users.filter(u => u.paid).length;
    const revenue = paidUsers * 999;

    res.json({
      users: totalUsers,
      paidUsers,
      revenue,
    });

  } catch (err) {
    res.json({ success: false });
  }
});
// ✅ REGISTER (separate route)
app.post("/register", async (req, res) => {
  console.log("REGISTER HIT");

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log("SAVED USER:", newUser);

  res.json({
    success: true,
    message: "Registered successfully",
  });
});
// ✅ LOGIN (uses stored users)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false });
    }

    const token = jwt.sign(
      { email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err); // 👈 VERY IMPORTANT
    res.status(500).json({ success: false });
  }
});
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.json({ success: false });
  }
});
app.post("/purchase", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { paid: true },
      { new: true }
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Payment successful",
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error updating payment",
    });
  }
});
app.post("/progress", async (req, res) => {
  const { email, progress } = req.body;

  try {
    await User.findOneAndUpdate(
      { email },
      { progress }
    );

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

// ✅ ALSO ADD THIS
app.get("/progress/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    res.json({
      progress: user.progress || [],
    });
  } catch {
    res.json({ progress: [] });
  }
});
// save comment
app.post("/comment", async (req, res) => {
  const { email, text } = req.body;

  try {
    await User.findOneAndUpdate(
      { email },
      { $push: { comments: { text } } }
    );

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

// get comments
app.get("/comment/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    res.json({
      comments: user.comments || [],
    });
  } catch {
    res.json({ comments: [] });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});