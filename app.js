import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from 'mongoose';

const app = express();

//connect to db
const uri = "mongodb://localhost:27017/postsSpg";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect(uri, options).then(
    () => { console.log('connect to db')},
    err => { err }
);

//Midlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api', require('./routes/post'));
app.use('/api', require('./routes/user'));

//Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());

//Static route
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
    console.log("escuchando en el puerto: ", app.get('port'))
});