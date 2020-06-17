import express from "express";

const router = express.Router();

import User from '../models/user'

//Hash Password
import bcrypt from 'bcrypt';
const saltRounds = 10;

// POST
router.post('/new-user', async (req, res) => {
    const body = {
        name: req.body.name,
        mail: req.body.mail,
        role: req.body.role
    }

    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {
        const userDB = await User.create(body);
        res.json(userDB);
    } 
    catch (error) {
        return res.status(500).json({
            mes: "an error hapend",
            error
        })
    }
});

module.exports = router;