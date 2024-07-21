import express from "express";
import {
  authenticate,
  isEmptyBody,
  isValidId,
  uploadPostImg,
} from "../../middlewares/index.js";
import postsController from "../../controllers/post-controller.js";
import { validateBody } from "../../decorators/index.js";
import { postAddSchema } from "../../models/Post.js";

const postsRouter = express.Router();

postsRouter.use(authenticate);

postsRouter.get("/", postsController.getMyPosts);
postsRouter.get("/last", postsController.getLastPosts);
postsRouter.get("/category/:category", postsController.getPostsByCategory);
postsRouter.get("/:id", isValidId, postsController.getPostById);

postsRouter.post(
  "/",
  uploadPostImg.single('image'),
  isEmptyBody,
  validateBody(postAddSchema),
  postsController.add
);

postsRouter.delete("/:id", isValidId, postsController.deleteById);
export default postsRouter;
