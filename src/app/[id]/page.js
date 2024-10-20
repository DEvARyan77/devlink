'use client'
import Header from './Header'
import LeftPage from './LeftPage'
import RightPage from './RightPage'
import './page.css'
import { useState,useEffect } from 'react';

export default function User(){
    const [links, setLinks] = useState([]);
    return(
        <div id='page'>
            <Header></Header>
            <div id='pages'>
                <LeftPage links={links} setLinks={setLinks} id="LeftPage"></LeftPage>
                <RightPage links={links} setLinks={setLinks} id="RightPage"></RightPage>
            </div>
        </div>
    )
}