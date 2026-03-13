import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Get replica set status
router.get("/backup-status", async (req, res) => {
    try {
        const connectionState = mongoose.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };

        res.json({
            replicaSet: "rs0",
            state: states[connectionState],
            host: mongoose.connection.host || "unknown",
            name: mongoose.connection.name || "unknown"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

