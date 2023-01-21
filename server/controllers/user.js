import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';


export const register = async (req,res)=>{
    try {
        const{name,email,password} = req.body
        if(password.length < 6 )return res.status(400).json({sucess:false,message:'La contraseña debe ser mayor de 6 caracteres o mas'})
        const emailLowerCase = email.toLowerCase();
        const existedUser = await User.findOne({ email: emailLowerCase });
        if (existedUser) return res.status(400).json({ success: false, message: '¡Ese usuario ya existe!' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email: emailLowerCase,
            password: hashedPassword,
          });
          const { _id: id, photoURL } = user;
          const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.status(201).json({
            success: true,
            result: { id, name, email: user.email, photoURL, token },
          });
    } catch (error) {
        console.log(error)
        res.status.json({success: false, message:'Algo paso mal'})
    }
}