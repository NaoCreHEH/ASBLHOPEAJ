import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              L'espoir (HOPE) est la lumière qui guide ceux qui marchent dans
              l'obscurité.
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Soutien, dialogue, actions concrètes et engagement communautaire
              pour un environnement épanouissant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-hope-yellow text-black hover:bg-hope-yellow/90 text-lg px-8"
                >
                  Rejoindre
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-hope-purple text-lg px-8"
                >
                  Agir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engagements Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hope-purple">
                Nos engagements contre le harcèlement, la précarité,
                l'isolement,...
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hope Action Jeunesse œuvre pour un environnement sûr et
                respectueux, en soutenant ceux qui souffrent par des actions
                concrètes et en sensibilisant la communauté pour donner aux
                jeunes et moins jeunes pour un avenir meilleur ensemble. Et
                inculquer des valeurs positives pour grandir main dans la main.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-full overflow-hidden bg-gradient-purple-blue flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="text-6xl mb-4">🌻</div>
                  <p className="text-xl font-semibold">
                    Ensemble pour l'espoir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-blue-purple text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Espoir, Lumière, Force, Joie
            </h2>
            <p className="text-xl">
              Découvrez des mots qui inspirent et encouragent, un véritable
              souffle d'espoir et de positivité.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["Inspirant", "Positif", "Encourageant", "Énergisant"].map(
              (value) => (
                <div
                  key={value}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <div className="text-5xl mb-2">⭐</div>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              )
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/mission">
              <Button
                size="lg"
                className="bg-white text-hope-purple hover:bg-white/90"
              >
                Explorer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hope-purple mb-4">
              Galerie d'espoir
            </h2>
            <p className="text-xl text-gray-700">
              Découvrez nos initiatives et moments forts contre le harcèlement.
            </p>
          </div>
          <div className="text-center">
            <Link href="/projets">
              <Button
                size="lg"
                className="bg-hope-purple text-white hover:bg-hope-purple/90"
              >
                Voir nos projets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
}
