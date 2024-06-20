import React from 'react';
import './Header.css';

const Header = () => {
    return (

        <div className='headers' >
            <h1 style={{
                margin: '1rem', 
                padding: '1rem',
                fontSize: '2rem',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif'
            }} >Mukul Gour</h1>


            <nav className="nav">
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>

    );
}

export default Header;
