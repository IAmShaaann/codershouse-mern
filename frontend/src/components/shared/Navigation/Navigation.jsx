import React from 'react'
import {Link}  from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
    const brandStyle = {
        color: '#fff', 
        textDecoration: 'none',
        fontWeight: 'bold', 
        fontSize: '22px',
        display: 'flex', 
        alighItems: 'center'  
    }
    const logoText = {
        marginLeft: '10px'
    }
    return (
        <nav className={`${styles.navbar} container`}>
            <Link to="/" style={brandStyle } >
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>CodersHouse</span>
            </Link>
        </nav>
    )
}

export default Navigation

// Note: The html a tag and react Link tag are different.  The a tag refreshes the page and the Link tag does not. 