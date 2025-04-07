import backgroundImg from '../assets/images/webp/background_lyon.webp';

function Home() {
    return (
        <>
            <section className="hero" style={{ backgroundImage: `url(${backgroundImg})` }}>
                <div className="hero__overlay">
                    <div className="hero__content">
                        <h1><span>BienSitué</span> — votre guide immobilier à Lyon</h1>
                        <p>Explorez les quartiers qui vous ressemblent, selon vos envies et votre budget.</p>
                        <div className="hero__search-bar">
                            <input
                                type="text"
                                placeholder="Recherchez un quartier, une adresse, un besoin..."
                            />
                            <button>Rechercher</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-2">
                {/* Ton contenu suivant ici */}
            </section>
        </>
    );
}

export default Home;
