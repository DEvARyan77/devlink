import { useEffect, useState } from 'react';
import Logo from './images/icon-preview-header.svg';
import Image from "next/image";
import Ufo from './images/ufo-flying.png';

export default function Login({ setlogin, write }) {
  const [showPassword, setShowPassword] = useState(false);
  const [browserClass, setBrowserClass] = useState('');

  useEffect(() => {
    // Function to detect the browser
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

    // Call the function to detect the browser
    detectBrowser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      Username: document.getElementById("signinUsername").value,
      Password: document.getElementById("signinPassword").value,
    };
    const res = await fetch('/api/Login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.sta === "User not found") {
      alert("User not Found!");
    } else if (result.sta === "Invalid password") {
      alert("Invalid Password!");
    } else {
      console.log("Successful");
      document.cookie = `token=${result.token};max-age=${60 * 60 * 24 * 30}; path=/`;
      window.location.href = '/user';
    }
  };

  return (
    <form id="form" className={browserClass}>
      <div id="login">
        <Image src={Ufo} className='ufo' id='signinUsernameufo' />
        <input placeholder="Username" id='signinUsername' onChange={write}></input><br />
        <Image src={Ufo} className='ufo' id='signinPasswordufo' />
        <input placeholder="Password" type={showPassword ? 'text' : 'password'} id='signinPassword' onChange={write}></input>
        <Image src={Logo} onClick={() => setShowPassword(prev => !prev)} id='Eye' /><br />
      </div>
      <p>Don't have an account? <span onClick={() => setlogin(false)}>Sign up</span></p>
      <button type="submit" onClick={handleLogin}>Submit</button>
    </form>
  );
}
