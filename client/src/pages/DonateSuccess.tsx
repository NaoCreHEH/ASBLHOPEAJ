import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CheckCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function DonateSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="py-16 flex-1 flex items-center justify-center bg-gray-50">
        <div className="container max-w-2xl">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <Heart size={80} className="text-hope-purple" fill="currentColor" />
                  <CheckCircle
                    size={40}
                    className="absolute -bottom-2 -right-2 text-green-500 bg-white rounded-full"
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-hope-purple">
                Merci pour votre générosité !
              </h1>

              <p className="text-lg text-gray-700 mb-6">
                Votre don a été reçu avec succès. Grâce à votre soutien, nous pouvons continuer
                notre mission de lutte contre le harcèlement et apporter de l'espoir aux jeunes.
              </p>

              <div className="bg-hope-yellow/20 p-6 rounded-lg mb-8">
                <p className="text-gray-800">
                  Vous recevrez un email de confirmation avec les détails de votre don.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-hope-purple hover:bg-hope-purple/90">
                    <Home size={20} className="mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link href="/projets">
                  <Button variant="outline">
                    Voir nos projets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
