import { useEffect, useState } from 'react';
import logoWhite from '../assets/images/png/logo_main_white.png';
import logoBlack from '../assets/images/png/logo_main_black.png';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentLogo = scrolled ? logoBlack : logoWhite;

    return (
        <header className={`header ${scrolled ? 'scrolled' : 'transparent'}`}>
            <div className="header__container">
                <img src={currentLogo} alt="Logo BienSitué" className="header__logo" />

                <nav className="header__nav">
                    <ul>
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Mon compte</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}