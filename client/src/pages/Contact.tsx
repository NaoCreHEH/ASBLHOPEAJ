import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessageMutation = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendMessageMutation.mutateAsync(formData);
      toast.success("Message envoyé avec succès!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Vous avez des questions ou souhaitez en savoir plus sur nos
            services ? N'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-2 border-hope-purple">
                <CardHeader className="bg-gradient-purple-blue text-white">
                  <CardTitle className="text-2xl">
                    Envoyez-nous un message
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Votre message..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-hope-purple hover:bg-hope-purple/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-2 border-hope-blue">
                <CardHeader className="bg-hope-blue text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Mail size={24} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <a
                    href="mailto:contact@asbl-hope.org"
                    className="text-lg text-hope-blue hover:underline"
                  >
                    contact@asbl-hope.org
                  </a>
                  <p className="text-gray-600 mt-2">
                    Nous répondons généralement dans les 24-48 heures.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-hope-yellow">
                <CardHeader className="bg-hope-yellow text-black">
                  <CardTitle className="text-2xl">Réseaux sociaux</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    Suivez-nous sur nos réseaux sociaux pour rester informé de
                    nos actions et événements.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-hope-blue hover:underline"
                    >
                      <Facebook size={24} />
                      Facebook
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-hope-purple hover:underline"
                    >
                      <Instagram size={24} />
                      Instagram
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-hope-green">
                <CardHeader className="bg-hope-green text-white">
                  <CardTitle className="text-2xl">Nos services</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    Nous proposons des interventions personnalisées dans les
                    écoles et institutions. Contactez-nous pour discuter de vos
                    besoins spécifiques.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Sensibilisation au harcèlement</li>
                    <li>Formation cyber-harcèlement</li>
                    <li>Ateliers interactifs</li>
                    <li>Classe Partage</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
