import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
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

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-hope-purple">
            Témoignages
          </h2>
          <p className="text-center text-gray-600">Chargement...</p>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4 text-hope-purple">
          Ils nous font confiance
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Découvrez les témoignages de nos partenaires et des écoles accompagnées
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
