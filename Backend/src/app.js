const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

//  require all the routes here
const authRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.routes");

// using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// Global error handler — catches any error thrown or passed to next() in routes/controllers
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(status).json({ message });
});

module.exports = app;