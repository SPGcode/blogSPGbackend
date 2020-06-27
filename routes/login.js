import express from "express";

const router = express.Router();

import jwt from 'jsonwebtoken';

import User from '../models/user';

//Hash Password
import bcrypt from 'bcrypt';
const saltRounds = 10;

router.post('/', async(req, res) =>{
    
    const body = req.body;
    
     try {
        
        const userDB = await User.findOne({mail: body.mail});

        if (!userDB) {
            return res.status(400).json({
                mes: "User or password dont exist",
            });
        } 
        if (!bcrypt.compareSync(body.pass, userDB.pass)){
            return res.status(400).json({
                mes: "incorrect password",
            });
        }

        //token generator
        const token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30});//1 mounth

        res.json({
            userDB,
            token
        });
        

     } catch (error) {
        return res.status(400).json({
            mes: "an error hapend",
            error
        });
       }
});

module.exports = router;