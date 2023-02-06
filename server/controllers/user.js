import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";
import Room from "../models/Room.js";

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "La contraseña debe tener 6 caracteres o más",
    });
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: "!El usuario, ya existe¡" });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id, photoURL, role, active } = user;
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token, role, active },
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: "El usuario no existe¡" });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: "Credenciales invalidas" });

  const { _id: id, name, photoURL, role, active } = existedUser;
  if (!active)
    return res.status(400).json({
      success: false,
      message:
        "Esta cuenta ha sido suspendidad. Favor de contactar con el administrador",
    });
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token, role, active },
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  const { _id: id, name, photoURL } = updatedUser;

  await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ success: true, result: { name, photoURL, token } });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});
