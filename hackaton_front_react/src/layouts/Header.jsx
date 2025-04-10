import React, { useEffect, useState } from 'react';
import logoWhite from '../assets/images/png/logo_main_white.png';
import logoBlack from '../assets/images/png/logo_main_black.png';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Logo différent selon le scroll
    const currentLogo = isScrolled ? logoBlack : logoWhite;

    // Classes dynamiques pour le header et la nav
    const headerClass = `header ${isScrolled ? 'scrolled' : 'transparent'}`;
    const navClass = `header__nav ${isMenuOpen ? 'open' : ''}`;

    return (
        <header className={headerClass}>
            <div className="header__container">
                <img src={currentLogo} alt="Logo" className="header__logo" />

                {/* Bouton hamburger (mobile) */}
                <button className="header__toggle" onClick={toggleMenu}>
                    {isMenuOpen ? '✖' : '☰'}
                </button>

                <nav className={navClass}>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/about">About us</Link></li>
                        <li><a href="javascript:void(0)">Mon compte</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}