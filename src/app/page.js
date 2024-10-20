'use client'
import Image from "next/image";
import styles from "./page.css";
import Login from './login'
import Signup from "./Signup";
import { useState } from "react";

export default function Home() {
  const [login,setlogin] = useState(true);
  const write = async(e)=>{
    if(document.getElementById(e.target.id).value.length<35){
        document.getElementById(e.target.id+"ufo").style.transform = `translate(${document.getElementById(e.target.id).value.length*8+30}px,-10px)`
    }
}
  return (
    <div id="loginPage">
      <title>DevLink-DevAryan</title>
      {login?(<Login setlogin={setlogin} write={write}></Login>):(<Signup setlogin={setlogin} write={write}></Signup>)}
    </div>
  );
}


