import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, hourlyRate } = req.body;
    const result = await registerUser(name, email, password, role, hourlyRate);
    res.json(result);
  } catch (err: any) {
    // log full error to server console to help debug DB issues
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};


export default { register, login };