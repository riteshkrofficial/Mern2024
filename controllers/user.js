import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User } from '../Models/users.js';
import { generateCookie } from '../utils/features.js';

export const userRegister = async (req, res) => {     //route converted from server prefix that is (/register) === /api/users/register

    const { name, email, password } = req.body

    //here we are adding is user has already registered if yes then it will not show register part it will show login part  as email is given in schema that it is unique 
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({
        success: false,
        message: "User Already exist.."
    })

    //hashing the password 
    const hashPasswword = await bcrypt.hash(password, 10)

    //saving user in db
    user = await User.create({
        name,
        email,
        password: hashPasswword
    })

    generateCookie(user, res, 201, "User Register Successfully!")
}


export const userLogin = async (req, res) => {

    const { email, password } = req.body

    let user = await User.findOne({ email });
    //in case if email is not found 
    if (!user) return res.status(400).json({
        success: false,
        message: "User does not exist.."
    })

    //Suppose if user is found then we are going to verify the password wheather it matches or not 
    //also down where we are compairing here password means at the time of login what user enter the password and user.password means the password which was earlier added 
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    })

    generateCookie(user, res, 201, `Welcome ${user.name}`)

}



export const logout = (req, res) => {    //api/users/logout
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: 'Logout successfully'
    })
}

//middleware me controller folder se-> that is user is login part will be inside middleware for code reusability and better understanding 
//at the time when you are login you can see your profile that functionality is being added here 
export const getMyProfile = (req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}


export const getUserById = async(req,res)=>{
    const id =  req.params.id;

    const user = await User.findById(id);

    if(!user) return res.status(404).json({
         success:false,
         message:"Invalid ID"
    })

    

    res.json({
        success:true,
        message:"This is single user",
        user
    })
}

