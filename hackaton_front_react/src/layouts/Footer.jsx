import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__left">
                <p>© 2025 BienSitué.</p>
            </div>

            <div className="footer__center">
                <span>Suivez-nous</span>
                <div className="footer__icons">
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaLinkedin /></a>
                </div>
            </div>

            <div className="footer__right">
                <span>Fait avec <span className="heart">❤</span> par les N4 Webtech Lyon</span>
            </div>
        </footer>
    );
}
