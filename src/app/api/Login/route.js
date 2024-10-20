import User from '../../utils/mongoDb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { Username, Password } = await req.json();
    const user = await User.findOne({ Username });
    if (!user) {
        return NextResponse.json({ sta: "User not found" });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
        return NextResponse.json({ sta: "Invalid password" });
    }
    const token = jwt.sign({ Username: user.Username }, "Token", { expiresIn: '1h' });
    return NextResponse.json({ sta:"Login successful" ,token});
}