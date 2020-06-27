import express from "express";

const router = express.Router();

import User from '../models/user';

//Import midleware
import {checkAuth, checkAdmin} from '../midlewares/authentication';

//Hash Password
import bcrypt from 'bcrypt';
const saltRounds = 10;

//PUT filters
import _ from 'underscore';


// POST
router.post('/new-user', async (req, res) => {
    const body = {
        name: req.body.name,
        mail: req.body.mail,
        role: req.body.role
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
router.put('/user/:id',[checkAuth, checkAdmin], async(req, res) =>{

    const _id = req.params.id;
    const body = _.pick(req.body, ['name', 'mail', 'pass', 'active']);

    if(body.pass){
        body.pass =hashSync(req.body.pass, saltRounds);
    }

    try {
       const userDB = await User.findByIdAndUpdate(
            _id, 
            body, 
            {new: true, runValidators: true});
        return res.json(userDB);

    } catch (error) {
        return res.status(400).json({
            mes: "an error hapend",
            error
        });
    };
});

module.exports = router;