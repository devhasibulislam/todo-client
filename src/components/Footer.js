import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='footer-block'>
            All right reserved, Copyright © {year}
        </div>
    );
};

export default Footer;