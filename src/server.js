const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stateRoutes = require("./routes/state");
const aiRoutes = require("./routes/ai");
const voiceRoutes = require("./routes/voiceroute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Indian Heritage API is running!"
    });
});
// server.js me yeh add karein
app.get('/ai-guide', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Yahan apne AI surface wali file ka path dein
});
app.use("/api/states", stateRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/voiceroute", voiceRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
