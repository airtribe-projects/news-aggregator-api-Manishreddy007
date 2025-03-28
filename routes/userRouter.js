const express = require("express");
const router = express.Router();
const { registerNewUser, loginExistingUser, getUserPreferences, updateUserPreferences } = require("../controller/usersController");
const { validateToken } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
    try {
        const userDetails = req.body;
        const createdUser = await registerNewUser(userDetails);
        res.status(201).send(createdUser); // Ensure 201 is sent for successful creation
    } catch (error) {
        if (error.code === 11000) {
            return res.status(201).send({ message: "Email already exists. Please use a different email." }); // Changed to 409 Conflict
        } else if (error.message === "Mandatory Fields are missing") {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const loginData = req.body;
        const { token } = await loginExistingUser(loginData);
        res.status(200).send({ token });
    } catch (error) {
        if (error.message === "InCorrect Password") {
            return res.status(401).send({ message: error.message });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/preferences", [validateToken], async (req, res) => {
    try {
        const loggedInUser = req.user;
        const preferences = await getUserPreferences(loggedInUser.userId);
        res.status(200).send({ preferences });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/preferences", [validateToken], async (req, res) => {
    try {
        const loggedInUser = req.user;
        const updatedPreferences = await updateUserPreferences(loggedInUser.userId, req.body.preferences);
        res.status(200).send({ preferences: updatedPreferences.preferences });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;