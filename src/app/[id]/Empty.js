'use client'
import Image from 'next/image'
import Empty from '../images/illustration-empty.svg'
import './Empty.css'

export default function User(){
    return(
        <div id='Empty'>
            <Image src={Empty}></Image>
            <h1>Let’s get you started</h1>
            <pre>Use the “Add new link” button to get started. Once you have more<br></br>than one link, you can reorder and edit them. We’re here to help<br></br>           you share your profiles with everyone!</pre>
        </div>
    )
}