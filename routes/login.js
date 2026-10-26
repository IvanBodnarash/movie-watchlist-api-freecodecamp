import express from "express";
import bcrypt from "bcryptjs";

import { findByUsername } from "../utils/db.js";
import { signJwt } from "../utils/jwt.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            error: "Some credentials are missing"
        });
    }

    const user = findByUsername(username);

    if (!user) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isMatchPassword) {
        return res.status(401).json({
            error: "Entered password doesn't match with existing"
        });
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        username: username,
        role: user.role
    }

    const token = signJwt(jwtPayload);

    res.status(200).json({ token: token });
});

export default router;