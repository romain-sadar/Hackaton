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
            <main>
                <Home />
            </main>

            {/* ──────────────── ⬇️ FOOTER ⬇️ ──────────────── */}
            <Footer />
        </>
    );
}

export default App;
