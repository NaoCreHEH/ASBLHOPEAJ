import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialForm from "@/components/TestimonialForm";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = trpc.testimonials.getApproved.useQuery();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-hope-yellow text-hope-yellow" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Témoignages
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Découvrez les expériences de nos partenaires et des écoles que nous accompagnons
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4 text-hope-purple">
            Ils nous font confiance
          </h2>
          <p className="text-center text-gray-600 mb-12">
            {testimonials?.length || 0} témoignage{testimonials && testimonials.length > 1 ? 's' : ''}
          </p>

          {isLoading ? (
            <p className="text-center text-gray-600">Chargement...</p>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="text-hope-purple opacity-20 mb-4" size={40} />
                    
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.content}"
                    </p>

                    <div className="mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-semibold text-hope-purple">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.organization}
                      </p>
                      {testimonial.role && (
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mb-16">
              Aucun témoignage pour le moment. Soyez le premier à partager votre expérience !
            </p>
          )}
        </div>
      </section>

      {/* Testimonial Form */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4 text-hope-purple">
            Partagez votre expérience
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Votre témoignage sera publié après validation par notre équipe
          </p>
          <TestimonialForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
