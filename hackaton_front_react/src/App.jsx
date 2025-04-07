// src/App.jsx
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import './assets/styles/global.css';

function App() {
    return (
        <>
            {/* ──────────────── ⬆️ HEADER ⬆️ ──────────────── */}
            <Header />

            {/* ──────────────── 🏠 HOME 🏠 ──────────────── */}
            <Home />

            {/* ──────────────── ⬇️ FOOTER ⬇️ ──────────────── */}
            <Footer />
        </>
    );
}

export default App;
