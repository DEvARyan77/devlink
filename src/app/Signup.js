import { useEffect, useState } from 'react';
import Logo from './images/icon-preview-header.svg';
import Avatar from './images/icon-profile-details-header.svg';
import Ufo from './images/ufo-flying.png';
import Image from "next/image";
import axios from 'axios';
import './Signup.css';

export default function Signup({ setlogin, write }) {
    const [showPassword, setShowPassword] = useState(false);
    const [browserClass, setBrowserClass] = useState('');

    // Detect browser and set class
    useEffect(() => {
        const detectBrowser = async () => {
            const userAgent = navigator.userAgent;

            if (userAgent.includes('Edg')) {
                setBrowserClass('edge-browser');
            } else if (navigator.brave && await navigator.brave.isBrave()) {
                setBrowserClass('brave-browser');
            } else if (userAgent.includes('Chrome')) {
                setBrowserClass('chrome-browser');
            }
        };

        detectBrowser();
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        const userData = {
            Username: document.getElementById("signupUsername").value,
            Name: document.getElementById("signupName").value,
            Email: document.getElementById("signupEmail").value,
            Password: document.getElementById("signupPassword").value,
        };

        try {
            const userRes = await fetch('/api/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const userResult = await userRes.json();

            if (userResult.sta === "Email") {
                alert("Incorrect email format!");
            } else if (userResult.sta === "Exist") {
                alert("User already exists!");
            } else {
                alert("Successfully Registered!");
                setlogin(true);
                const imageInput = document.getElementById('imageInput');
                const formData = new FormData();

                // Check for image file
                if (imageInput.files.length > 0) {
                    formData.append("Image", imageInput.files[0]);
                    formData.append("Username", document.getElementById("signupUsername").value);
                    try {
                        // Upload the image
                        await axios.post('/api/Image', formData);
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        return; // Stop execution if image upload fails
                    }
                } else {
                    console.log("No image file selected");
                }
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById('Avatar').src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form id="form" className={browserClass} onSubmit={handleSignup}>
            <Image 
                src={Avatar} 
                id='Avatar' 
                onClick={handleImageClick} 
                alt="Profile Avatar" 
                style={{ cursor: 'pointer' }} 
            />
            <input 
                type='file' 
                id='imageInput' 
                accept='image/*' 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
            />
            <div>
                <Image src={Ufo} className='ufo' id='signupUsernameufo' alt="Username Icon" />
                <input placeholder="Username" id='signupUsername' onChange={write} minLength={4} required /><br />
                <Image src={Ufo} className='ufo' id='signupNameufo' alt="Name Icon" />
                <input placeholder="Name" id='signupName' onChange={write} required /><br />
                <Image src={Ufo} className='ufo' id='signupEmailufo' alt="Email Icon" />
                <input placeholder="Email" id='signupEmail' onChange={write} required /><br />
                <Image src={Ufo} className='ufo' id='signupPasswordufo' alt="Password Icon" />
                <input 
                    placeholder="Password" 
                    id='signupPassword' 
                    minLength={8} 
                    onChange={write} 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                />
                <Image src={Logo} onClick={() => setShowPassword(prev => !prev)} id='Eye' alt="Toggle Password Visibility" /><br />
            </div>
            <p>Have an account? <span onClick={() => setlogin(true)}>Sign in</span></p>
            <button type="submit">Submit</button>
        </form>
    );
}
