import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost)
// router.delete("/like/:id", protectRoute, likeunlikePost)
// router.delete("/comment/:id", protectRoute, commentPost)
// router.delete("/", protectRoute, deletePost)
export default router;
