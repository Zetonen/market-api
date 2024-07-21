import fs from "fs/promises";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, cloudinary } from "../helpers/index.js";
import Post from "../models/Post.js";
import Todo from "../models/Post.js";

const getAllTodo = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Todo.find({ owner });
  res.json(result);
};
const getTodoById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Todo.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404, `Todo with id=${_id} not found`);
  }
  res.json(result);
};
const addTodo = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Todo.create({ ...req.body, owner });

  res.status(201).json(result);
};
const updateById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await Todo.findByIdAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Todo with id=${_id} not found`);
  }
  res.json(result);
};
// const deleteById = async (req, res) => {
//   const { id: _id } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Todo.findByIdAndDelete({ _id, owner });

//   if (!result) {
//     throw HttpError(404, `Todo with id=${_id} not found`);
//   }
//   res.json({ message: "Delete success" });
// };
//-------
const getMyPosts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Post.find({ owner });
  res.json(result);
};
const getPostById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  console.log(1);
  const result = await Post.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404, `Post with id=${_id} not found`);
  }
  res.json(result);
};

const getLastPosts = async (req, res) => {
  const result = await Post.find().sort({ createdAt: -1 }).limit(10);
  res.json(result);
};
const getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  const result = await Todo.find({ category });
  if (!result) {
    throw HttpError(404, `Posts with category=${category} not found`);
  }
  res.json(result);
};
const addPost = async (req, res) => {
  const { _id: owner } = req.user;
  const fileData = await cloudinary.uploader.upload(req.file.path, {
    folder: "marketPosts",
  });
  await fs.unlink(req.file.path);
  const result = await Post.create({ ...req.body, image: fileData.url, owner });

  res.status(201).json(result);
};
const deleteById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Post.findByIdAndDelete({ _id, owner });

  if (!result) {
    throw HttpError(404, `Post with id=${_id} not found`);
  }
  res.json({ message: "Delete success" });
};

export default {
  getMyPosts: ctrlWrapper(getMyPosts),
  getPostById: ctrlWrapper(getPostById),
  getLastPosts: ctrlWrapper(getLastPosts),
  getPostsByCategory: ctrlWrapper(getPostsByCategory),
  add: ctrlWrapper(addPost),
  deleteById: ctrlWrapper(deleteById),
};
