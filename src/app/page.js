'use client';
import Image from "next/image";
import styles from "./page.css";
import Login from './login';
import Signup from "./Signup";
import { useState, useEffect } from "react";

export default function Home() {
  const [login, setlogin] = useState(true);
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  useEffect(() => {
    const detectBrowser = async () => {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Edg')) {
        setPrimary(6);
        setSecondary(0);
      } else if (navigator.brave && await navigator.brave.isBrave()) {
        setPrimary(6);
        setSecondary(0);
      } else if (userAgent.includes('Chrome')) {
        setPrimary(8);
        setSecondary(30);
      }
    };

    detectBrowser();
  }, []);

  const write = (e) => {
    const inputValue = document.getElementById(e.target.id).value;
    if (inputValue.length < 35) {
      const translateValue = inputValue.length * primary + secondary;
      document.getElementById(e.target.id + "ufo").style.transform = `translate(${translateValue}px, -10px)`;
    }
  };

  return (
    <div id="loginPage">
      <title>DevLink-DevAryan</title>
      {login ? (
        <Login setlogin={setlogin} write={write} />
      ) : (
        <Signup setlogin={setlogin} write={write} />
      )}
    </div>
  );
}
