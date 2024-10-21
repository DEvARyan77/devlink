'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LogoLarge from '../images/logo-devlinks-large.svg';
import LogoSmall from '../images/logo-devlinks-small.svg'; // Add the smaller logo for mobile
import Link from '../images/icon-link.svg';
import Preview from '../images/icon-preview-header.svg';
import Profile from '../images/icon-profile-details-header.svg';
import './header.css';

export default function User() {
    const [logoSrc, setLogoSrc] = useState(LogoLarge);
    const [activeTab, setActiveTab] = useState('links'); // State to track the active tab

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
        setActiveTab('profile'); // Set 'Profile' as the active tab
        if (window.innerWidth < 768) {
            document.getElementById('scroll').style.left = "40%";
            return;
        }
        document.getElementById('scroll').style.width = "150px";
        document.getElementById('scroll').style.left = "32%";
    };

    const shiftL = () => {
        setActiveTab('links'); // Set 'Links' as the active tab
        if (window.innerWidth < 768) {
            document.getElementById('scroll').style.left = "-7%";
            return;
        }
        document.getElementById('scroll').style.width = "100px";
        document.getElementById('scroll').style.left = "-7%";
    };

    // CSS filter for active tab (colorful)
    const activeFilter = 'brightness(0) saturate(100%) invert(22%) sepia(80%) saturate(5701%) hue-rotate(250deg) brightness(106%) contrast(101%)';

    // CSS filter for inactive tab (black)
    const inactiveFilter = 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(0%)';

    // Style for active/inactive text colors
    const activeTextColor = { color: '#7D4EFC' }; // For active tab (purple)
    const inactiveTextColor = { color: '#000' }; // For inactive tab (black)

    return (
        <div id='header'>
            <Image src={logoSrc} alt='Logo' />
            <div>
                <div id='scroll'></div>
                <div id='link' onClick={shiftL}>
                    {/* Apply the filter based on whether 'Links' is the active tab */}
                    <Image
                        src={Link}
                        alt="Link Icon"
                        style={{ filter: activeTab === 'links' ? activeFilter : inactiveFilter }}
                    />
                    {/* Apply text color based on the active tab */}
                    <p style={activeTab === 'links' ? activeTextColor : inactiveTextColor}>Links</p>
                </div>
                <div id='personalDetails' onClick={shiftP}>
                    {/* Apply the filter based on whether 'Profile' is the active tab */}
                    <Image
                        src={Profile}
                        alt="Profile Icon"
                        style={{ filter: activeTab === 'profile' ? activeFilter : inactiveFilter }}
                    />
                    {/* Apply text color based on the active tab */}
                    <p style={activeTab === 'profile' ? activeTextColor : inactiveTextColor}>Profile Details</p>
                </div>
            </div>
            <p><Image src={Preview} alt="Preview Icon" /><span>Preview</span></p>
        </div>
    );
}
