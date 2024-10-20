'use client';
import Image from 'next/image';
import Phone from '../images/illustration-phone-mockup.svg';
import DefaultAvatar from '../images/favicon.ico.png'; // Use a descriptive name
import './LeftPage.css';
import GitHub from '../images/icon-github.svg';
import YouTube from '../images/icon-youtube.svg';
import LinkedIn from '../images/icon-linkedin.svg';
import Facebook from '../images/icon-facebook.svg';
import FrontendMentor from '../images/icon-frontend-mentor.svg';
import Hashnode from '../images/icon-hashnode.svg';
import RightArrow from '../images/icon-arrow-right.svg';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function User({ links, setLinks }) {
    const [Username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(DefaultAvatar); 

    const fetchData = async () => {
        const token = Cookies.get('token'); // Get the JWT from cookies

        if (!token) {
            console.error('No JWT found');
            window.location.href = '/';
            return;
        }

        try {
            const response = await axios.post('/api/fetchData', { token });
            setUsername(response.data.Username); // Update the state with the fetched username
        } catch (error) {
            console.error("Error fetching data:", error);
            window.location.href = '/';
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update the avatar URL whenever the Username changes
    useEffect(() => { 
        if (Username) {
            const url = `https://res.cloudinary.com/daswnxocr/image/upload/v1729420510/${Username}.jpg`;

            // Use the native Image constructor
            const img = new window.Image(); // Correctly use the native Image constructor
            img.src = url;

            // Check if the image loads successfully
            img.onload = () => {
                setAvatarUrl(url); // If it loads, set the avatar URL
            };

            img.onerror = () => {
                setAvatarUrl(DefaultAvatar); // If it fails, revert to default avatar
            };
        }
    }, [Username]); // Add Username as a dependency

    const platformColors = {
        'GitHub': '#181717',
        'YouTube': '#FF0000',
        'LinkedIn': '#0077B5',
        'Facebook': '#4267B2',
        'Frontend Mentor': '#2B2D42',
        'Hashnode': '#3B1F3F'
    };

    return (
        <div id='LeftPage'>
            <Image src={Phone} id='Phonemock' alt="Phone Mockup" />
            <Image src={avatarUrl} id='AvatarLeft' width={100} height={100} alt="User Avatar" />
            <div className="platforms-container">
                {links.map((link) => (
                    <div
                        key={link.id}
                        className="platform-item"
                        style={{
                            backgroundColor: platformColors[link.platform],
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#fff'
                        }}
                    >
                        <Image 
                            src={link.platform === 'GitHub' ? GitHub : 
                                  link.platform === 'YouTube' ? YouTube : 
                                  link.platform === 'LinkedIn' ? LinkedIn : 
                                  link.platform === 'Facebook' ? Facebook : 
                                  link.platform === 'Frontend Mentor' ? FrontendMentor : 
                                  Hashnode} 
                            alt={link.platform} 
                            width={24} 
                            height={24} 
                        />
                        <span style={{ marginLeft: '10px' }}>{link.platform}</span>
                        <Image
                            src={RightArrow}
                            alt="Right arrow"
                            style={{ marginLeft: 'auto', cursor: 'pointer' }}
                            onClick={() => {
                                if (link.url) {
                                    window.open(link.url, '_blank'); // Open link in a new tab
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
