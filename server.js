require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Debug
console.log("HF KEY:", process.env.HF_API_KEY);

// Test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// AI route
app.post("/ask", async (req, res) => {
    const { question } = req.body;

    console.log("API HIT:", question);

    let answer = "";

    const q = question.toLowerCase();

    if (q.includes("dbms")) {
        answer = "DBMS (Database Management System) is software that helps store, manage, and retrieve data efficiently.";
    } 
    else if (q.includes("ai")) {
        answer = "Artificial Intelligence (AI) is the ability of machines to mimic human intelligence like learning and problem-solving.";
    } 
    else if (q.includes("java")) {
        answer = "Java is an object-oriented programming language used to build applications, websites, and enterprise systems.";
    } 
    else if (q.includes("oops")) {
        answer = "OOPs is a programming concept based on objects and classes, promoting reuse and modularity.";
    } 
    else {
        answer = `This is a smart response for: "${question}". You can upgrade this to real AI later.`;
    }

    res.json({ answer });
});
// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});