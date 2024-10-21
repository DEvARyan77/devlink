'use client';
import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RightPage.css';
import Link from '../images/icon-link.svg';
import EmptyEle from './Empty.js'; 
import Image from 'next/image';
import Arrow from '../images/icon-chevron-down.svg'; 
import RightArrow from '../images/icon-arrow-right.svg';
import GitHub from '../images/icon-github.svg';
import YouTube from '../images/icon-youtube.svg';
import LinkedIn from '../images/icon-linkedin.svg';
import Facebook from '../images/icon-facebook.svg';
import FrontendMentor from '../images/icon-frontend-mentor.svg';
import Hashnode from '../images/icon-hashnode.svg';

export default function User({links,setLinks}) {
    const [flipped, setFlipped] = useState(null);
    const [errors, setErrors] = useState({});
    const dropdownRefs = useRef([]);

    const platformValidation = {
        'GitHub': /^https:\/\/(www\.)?github\.com\/.+$/,
        'YouTube': /^https:\/\/(www\.)?youtube\.com\/.+$/,
        'LinkedIn': /^https:\/\/(www\.)?linkedin\.com\/.+$/,
        'Facebook': /^https:\/\/(www\.)?facebook\.com\/.+$/,
        'Frontend Mentor': /^https:\/\/(www\.)?frontendmentor\.io\/.+$/,
        'Hashnode': /^https:\/\/(www\.)?hashnode\.com\/.+$/
    };

    const addLink = () => {
        // Check if the number of links is less than 5 before adding a new link
        if (links.length < 5) {
            setLinks([...links, { id: Date.now(), platform: 'GitHub', url: '' }]);
        } else {
            alert("You can only add a maximum of 5 links.");
        }
    };

    const handleInputChange = (id, field, value) => {
        setLinks(links.map(link => 
            link.id === id ? { ...link, [field]: value } : link
        ));

        if (field === 'url') {
            setErrors({...errors, [id]: ''});
        }
    };

    const validateLinkOnBlur = (id, platform, url) => {
        if (!url.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, [id]: "Can't be empty" }));
        } else if (!platformValidation[platform].test(url)) {
            setErrors(prevErrors => ({ ...prevErrors, [id]: `Invalid URL` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
        }
    };

    const removeLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
        const updatedErrors = { ...errors };
        delete updatedErrors[id];
        setErrors(updatedErrors);
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (source.index === destination.index) return;

        const updatedLinks = Array.from(links);
        const [movedItem] = updatedLinks.splice(source.index, 1);
        updatedLinks.splice(destination.index, 0, movedItem);
        setLinks(updatedLinks);
    };

    const toggleFlip = (index) => {
        setFlipped(flipped === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setFlipped(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id='RightPage'>
            <h1>Customize your links</h1>
            <p>Add/edit/remove links below and then share all your profiles with the world!</p>
            
            <div onClick={addLink} id='Add'>
                + Add new link
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            className="scrollable-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {links.length === 0 ? (
                                <EmptyEle />
                            ) : (
                                <div className="links-container">
                                    {links.map((link, index) => (
                                        <Draggable key={link.id} draggableId={link.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="link-item draggable"
                                                >
                                                    <div className="link-header">
                                                        <span className="link-number">= Link #{index + 1}</span>
                                                        <span className="remove-link" onClick={() => removeLink(link.id)}>Remove</span>
                                                    </div>
                                                    <div className="link-body">
                                                        <label>Platform</label><br />
                                                        <div className="custom-dropdown" ref={el => dropdownRefs.current[index] = el} onClick={() => toggleFlip(index)}>
                                                            <div className="dropdown-selected">
                                                                <Image src={link.platform === 'GitHub' ? GitHub : link.platform === 'YouTube' ? YouTube : link.platform === 'LinkedIn' ? LinkedIn : link.platform === 'Facebook' ? Facebook : link.platform === 'Frontend Mentor' ? FrontendMentor : Hashnode} alt={link.platform} />
                                                                {link.platform || "Select platform"}
                                                            </div>
                                                            {flipped === index && (
                                                                <ul className="dropdown-options">
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'GitHub')}>
                                                                        <Image src={GitHub} alt="GitHub" /> GitHub
                                                                    </li>
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'YouTube')}>
                                                                        <Image src={YouTube} alt="YouTube" /> YouTube
                                                                    </li>
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'LinkedIn')}>
                                                                        <Image src={LinkedIn} alt="LinkedIn" /> LinkedIn
                                                                    </li>
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'Facebook')}>
                                                                        <Image src={Facebook} alt="Facebook" /> Facebook
                                                                    </li>
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'Frontend Mentor')}>
                                                                        <Image src={FrontendMentor} alt="Frontend Mentor" /> Frontend Mentor
                                                                    </li>
                                                                    <li onClick={() => handleInputChange(link.id, 'platform', 'Hashnode')}>
                                                                        <Image src={Hashnode} alt="Hashnode" /> Hashnode
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            <Image src={Arrow} className={`arrow ${flipped === index ? 'flipped' : ''}`} alt="Arrow indicator" />
                                                        </div><br></br>

                                                        <label>Link</label>
                                                        <div className="input-wrapper">
                                                            <Image src={Link} id='link_icon' alt="Link icon" />
                                                            <div className="input-container">
                                                                <input
                                                                    id='link_input'
                                                                    type="url"
                                                                    className={errors[link.id] ? 'error-input' : ''}
                                                                    placeholder="e.g. https://www.example.com"
                                                                    value={link.url}
                                                                    onChange={(e) => handleInputChange(link.id, 'url', e.target.value)}
                                                                    onBlur={() => validateLinkOnBlur(link.id, link.platform, link.url)}
                                                                />
                                                                {errors[link.id] && (
                                                                    <span className="error-message">{errors[link.id]}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <button className="save-button" disabled={links.length === 0}>
                Save
            </button>

            {/* Render the platform divs here */}
            
        </div>
    );
}
