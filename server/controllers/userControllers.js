const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

//email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.password,
  },
});

//otp send///

exports.userOtpSend = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "Please Enter Your Email" });
    }
  
    try {
      const presuer = await users.findOne({ email: email });
  
      if (presuer) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
  
        const existEmail = await userotp.findOne({ email: email });
        if (existEmail) {
          const updateData = await userotp.findByIdAndUpdate(
            { _id: existEmail._id },
            {
              otp: OTP,
            },
            { new: true }
          );
          await updateData.save();
  
          
  
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Eamil For Otp Validation",
            text: `OTP:- ${OTP}`,
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("error", error);
              return res.status(400).json({ error: "email not send" });
            } else {
              // console.log("Email sent", info.response);
             return res.status(200).json({ message: "Email sent Successfully" });
            }
          });
        } else {
          const saveOtpData = new userotp({
            email,
            otp: OTP,
          });
  
          await saveOtpData.save();
  
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Eamil For Otp Validation",
            text: `OTP:- ${OTP}`,
          };
  
          tarnsporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("error", error);
             return res.status(400).json({ error: "email not send" });
            } else {
              console.log("Email sent", info.response);
             return res.status(200).json({ message: "Email sent Successfully" });
            }
          });
        }
      } else {
        return res.status(400).json({ error: "this user not Exist in our DB" });
      }
    } catch {
      return res.status(400).json({ err: "Invalid Details", error });
    }
  };

  ///Register

exports.userregister = async (req, res) => {
  const { fname, email, password } = req.body;
  

  if (!fname || !email || !password) {
    return res.status(400).json({ error: "please Enter All Input Data" });
  }

  try {

    const otpverification = await userotp.findOne({email:email});

    if(otpverification.otp === otp){
        const preuser = await users.findOne({email:email});

        // token generate
        const token = await preuser.generateAuthtoken();
      
        
       res.status(200).json({message:"User Login Succesfully Done",userToken:token});

    }else{
        res.status(400).json({error:"Invalid Otp"})
    }


    const preuser = await users.findOne({ email: email });
    if (preuser) {
      return res.status(400).json({ error: "This User Aready exist" });
    } else {
      const userregister = new users({
        fname,
        email,
        password,
      });

      //hashing password

      const storeData = await userregister.save();
      return res.status(200).json(storeData);
    }
  } catch (error) {
    return res.status(400).json({ err: "Invalid Details", error });
  }
};



//login

exports.userLogin = async(req,res)=>{
    const {email,otp} = req.body;

    if(!otp || !email){
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
       
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}
