const express = require("express");
const axios = require("axios");
const { validateToken } = require("../middlewares/auth"); 
const userSchema = require("../models/userModels"); 
const router = express.Router();
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get("/", [validateToken], async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await userSchema.findById(userId);
        const preferencesList = user.preferences;

        if (!preferencesList || preferencesList.length === 0) {
            return res.status(400).send({ message: "No preferences found" });
        }

        const preferencesQuery = preferencesList.join(" OR ");

        const newsResponse = await axios.get(NEWS_API_URL, {
            params: {
                q: preferencesQuery,
                apiKey: NEWS_API_KEY
            }
        });
        res.status(200).send({ news: newsResponse.data.articles });
    } catch (error) {
        console.error("Error fetching news:", error.message); // Add logging for debugging
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;