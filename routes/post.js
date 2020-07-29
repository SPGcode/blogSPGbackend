import express from "express";

const router = express.Router();

//import post model
import Post from "../models/post";

//import midlewares
import {checkAuth} from '../midlewares/authentication';


//add a post
router.post("/new-post",checkAuth, async (req, res) => {
  const body = req.body;
  body.userId = req.user._id;
  body.userName = req.user.name

  try {
    const postDB = await Post.create(body);
    console.log(postDB)
    res.json(postDB);
  } catch (error) {
    return res.status(500).json({
      mes: "An error hapend",
      error,
    });
  }
});

//Get with parameters
router.get("/post/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id.data)
  try {
    const postDB = await Post.findOne({ _id });
    res.json(postDB);
  } catch (error) {
    return res.status(400).json({
      mes: "An error hapend",
      error,
    });
  }
});

//Get all posts without parameters
router.get("/posts", async (req, res) => {
  try {
    const postDB = await Post.find();
    res.json(postDB);
  } catch (error) {
    return res.status(400).json({
      mes: "An error hapend",
      error,
    });
  }
});

//Edit post
router.put("/post/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const postDB = await Post.findByIdAndUpdate(_id, body, { new: true });
    res.json(postDB);
  } catch (error) {
    return res.status(400).json({
      mes: "An error hapend",
      error,
    });
  }
});

//Delete post
router.delete("/post/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id)
  try {
    const postDB = await Post.findByIdAndDelete({ _id });
    if (!postDB) {
      return res.status(400).json({
        mes: "An error hapend",
        error,
      });
    } else {
      res.json(postDB);
    }
  } catch (error) {
    return res.status(400).json({
      mes: "An error hapend id isn´t correct",
      error,
    });
  }
});

module.exports = router;
