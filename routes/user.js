import express from "express";
const router = express.Router();

import User from '../models/user';

//Import midleware
import upload from '../libs/storage'

// import {checkAuth, checkAdmin} from '../midlewares/authentication';

//Hash Password
import bcrypt from 'bcrypt';
const saltRounds = 10;

//PUT filters
import _ from 'underscore';


// POST
router.post('/new-user', upload.single('avatar'), async (req, res) => {
    console.log(req.body)
    const body = {
        name: req.body.name,
        mail: req.body.mail,
        role: req.body.role,
        avatar: req.file.path
    };

    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {
        const userDB = await User.create(body);
        res.json(userDB);
    } 
    catch (error) {
        return res.status(500).json({
            mes: "an error hapend",
            error
        });
    };
});

//User updates
router.put('/user/:id', async(req, res) =>{

    const _id = req.params.id;
    const body = _.pick(req.body, ['name', 'mail', 'pass', 'active']);

    if(body.pass){
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    try {
       const userDB = await User.findByIdAndUpdate(
            _id, 
            body, 
            {new: true});
        return res.json(userDB);

    } catch (error) {
        return res.status(400).json({
            mes: "an error hapend",
            error
        });
    };
});

//Get user
router.get("/user/:id", async (req, res) => {
    const _id = req.params.id;
    console.log(_id.data)
    try {
      const userDB = await User.findOne({ _id });
      res.json(userDB);
    } catch (error) {
      return res.status(400).json({
        mes: "An error hapend",
        error,
      });
    }
  });

module.exports = router;