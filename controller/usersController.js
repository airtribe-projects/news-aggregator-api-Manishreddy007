const saltRounds = 10;
const bcrypt = require("bcrypt");
const userSchema = require("../models/userModels");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerNewUser = async (userDetails) => {
    if (!userDetails.email ||  !userDetails.name ||  !userDetails.preferences || !userDetails.password) {
        throw new Error("Mandatory Fields are missing");
    }

    userDetails.password = bcrypt.hashSync(userDetails.password, saltRounds);
    const createdUser = await userSchema.create(userDetails);
    return createdUser;
};

const loginExistingUser = async (loginData) => {
    const query = { email: loginData.email };
    const user = await userSchema.findOne(query);
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("InCorrect Password");
    }
    const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    return { token };
};

const getUserPreferences = async (userId) => {
    if (!userId) {
        throw new Error("No user Id");
    }
    const user = await userSchema.findById(userId);

    if (!user) {
        throw new Error("User not Found");
    }
    return user.preferences;
};

const updateUserPreferences = async (userId, preferences) => {
    const user = await userSchema.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (preferences) {
        user.preferences = preferences;
    }
    const updatedUser = await user.save();
    return { preferences: updatedUser.preferences };
};

module.exports = { registerNewUser, loginExistingUser, getUserPreferences, updateUserPreferences };