import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {

    const token = req.get('token');

    jwt.verify(token, 'secret', (err, decoded) => {

        if(err){
            return res.status(401).json({
                mes: "an error hapend",
                err
            });
        }

        req.user = decoded.data;

        next();

    });

}

const checkAdmin = (req, res, next) => {

    const role = req.user.role

    if(role === 'ADMIN'){
        next()
    } else {
        return res.status(401).json({
            mes: "User nnot valid",            
        });
    }


}


module.exports = {checkAuth, checkAdmin}