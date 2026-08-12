import Navbar from '../../Shared/Navbar'

function LandingPages() {
    return (
        <div className="min-h-screen bg-[#151616] text-white">
            <Navbar />

            <main className="flex min-h-[80vh] items-center justify-center">
                <h1 className="text-6xl font-bold text-[#ff6b2c]">
                    Landing Page
                </h1>
            </main>
        </div>
    )
}

export default LandingPages