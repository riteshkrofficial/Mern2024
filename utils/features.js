import jwt from "jsonwebtoken"



 //jwt token here used for storing the user id and through that allowing user to logging by accessing the token through id
    export const generateCookie  = (user, res, statusCode=200,message)=>{
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
 // const token = jwt.sign({user},'!@#$%^&*()')
 

//  console.log(token)

 res.status(201).cookie("token",token,{
     httpOnly:true,
     maxAge:10*60*1000,
     sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
     secure:process.env.NODE_ENV === "Development"?false:true
 }).json({
     success:true,
     message
     
 })
    }






  