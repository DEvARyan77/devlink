import User from '../../utils/mongoDb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const { Username, Name, Email, Password } = await req.json();
    const validity = await User.findOne({Username})
    if(validity){
        return NextResponse.json({sta:"Exist"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        return NextResponse.json({ sta: "Email" });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({ Username, Name, Email, Password:hashedPassword });
    await newUser.save();   
    return NextResponse.json({sta:true})
}