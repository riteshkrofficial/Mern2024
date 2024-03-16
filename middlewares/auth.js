import { User } from "../Models/users.js";
import jwt from 'jsonwebtoken'


//ye file came from user.js by export const getMyProfile
export const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies

    console.log(token);

    if(!token) return res.status(404).json({
        success:false,
        message:"Please Login..!"
    })

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    // console.log("decoded data",decode)

    req.user = await User.findById(decode._id)

    // console.log(req.user);

    next();
}


// chatgpt more efficient and same code of the getMyProfile uncommenting for referce in future
// export const getMyProfile = (req, res) => {
//     try {
//         const { token } = req.cookies;
        
//         if (!token) {
//             console.log("Token not found in cookies");
//             return res.status(401).json({ error: "Unauthorized" });
//         }

//         console.log(token);
//         // Further logic to handle the user profile retrieval
//     } catch (error) {
//         console.error("Error while retrieving token:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }