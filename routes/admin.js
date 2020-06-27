import express from "express";

const router = express.Router();

import User from '../models/user';

//Import midleware
import {checkAuth, checkAdmin} from '../midlewares/authentication';

//Get Users

router.get("/users", checkAdmin, async (req, res) => {
    try {
      const userDB = await User.find();
      res.json(userDB);
    } catch (error) {
      return res.status(400).json({
        mes: "An error hapend",
        error,
      });
    }
  });

  module.exports = router;