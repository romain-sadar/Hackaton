import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'; // ← importe ta page "About"

import './assets/styles/global.css';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
