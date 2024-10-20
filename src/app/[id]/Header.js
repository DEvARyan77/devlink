'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LogoLarge from '../images/logo-devlinks-large.svg';
import LogoSmall from '../images/logo-devlinks-small.svg'; // Add the smaller logo for mobile
import Link from '../images/icon-link.svg';
import Preview from '../images/icon-preview-header.svg'
import Profile from '../images/icon-profile-details-header.svg';
import './header.css';

export default function User() {
    const [logoSrc, setLogoSrc] = useState(LogoLarge);

    // Function to update the logo source based on screen width
    useEffect(() => {
        const updateLogo = () => {
            if (window.innerWidth <= 768) {
                setLogoSrc(LogoSmall); // Use small logo for mobile
            } else {
                setLogoSrc(LogoLarge); // Use large logo for larger screens
            }
        };

        // Initial check
        updateLogo();

        // Add event listener for screen resizing
        window.addEventListener('resize', updateLogo);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', updateLogo);
    }, []);

    const shiftP = () => {
        if (window.innerWidth < 768){
            document.getElementById('scroll').style.left = "40%";
            return;
        }
        document.getElementById('scroll').style.width = "150px";
        document.getElementById('scroll').style.left = "32%";
    };

    const shiftL = () => {
        if (window.innerWidth < 768){
            document.getElementById('scroll').style.left = "-7%";
            return
        }
        document.getElementById('scroll').style.width = "100px";
        document.getElementById('scroll').style.left = "-7%";
    };

    return (
        <div id='header'>
            <Image src={logoSrc} alt='Logo' />
            <div>
                <div id='scroll'></div>
                <div id='link' onClick={shiftL}>
                    <Image src={Link} alt="Link Icon" />
                    <p>Links</p>
                </div>
                <div id='personalDetails' onClick={shiftP}>
                    <Image src={Profile} alt="Profile Icon" />
                    <p>Profile Details</p>
                </div>
            </div>
            <p><Image src={Preview}></Image><span>Preview</span></p>
        </div>
    );
}
