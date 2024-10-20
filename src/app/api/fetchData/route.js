import User from '../../utils/mongoDb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { token } = await req.json();
    console.log(token);

    // Verify the token and extract the username
    try {
        const decoded = jwt.verify(token, 'Token'); // Replace 'Token' with your actual secret key
        console.log('Username:', decoded.Username);
        
        // Return the Username in the response
        return NextResponse.json({ Username: decoded.Username });
    } catch (err) {
        console.error('Token verification failed:', err);
        
        // Return an error response if verification fails
        return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
    }
}
