const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        require:true,
    },
    DepartmentId:{
        type:String,
        require:true,
    },
    //Date of Birth
    DOB:{
        type:String,
        require:true,
    },
    Gender:{
        type:String,
    }

})

module.exports = mongoose.model('auth',UserSchema);