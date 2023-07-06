const mongoose = require("mongoose");
const validator = require("validator");

const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
          if (!validator.isEmail(value)) {
            throw new error("Not Valid Email");
          }
        },
      },
      otp:{
        type:String,
        required:true
      }
});

//user otp models

const userotp = new mongoose.model("userotps",userOtpSchema)
module.exports = userotp;