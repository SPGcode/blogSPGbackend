import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol not valid'
}

const userSchema = new Schema({

    name: {type: String, required: [true, 'Name is required']},
    avatar:"",
    mail: {
        type: String, 
        required: [true, 'mail is required'],
        unique: true
    },
    pass: {type: String, required: [true, 'Pass is required']},
    date: {type: Date, default: Date.now},
    role: {type: String, default: 'USER', enum: roles},
    activ: {type: Boolean, default: true}
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} unique'});


//Hide data pass in front view https://medium.com/@contactsunny/hide-properties-of-mongoose-objects-in-node-js-json-responses-a5437a5dbec2
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.pass;
    return obj;
}

const User = mongoose.model('User', userSchema);

export default User