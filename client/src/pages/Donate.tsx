import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Heart, Euro, Users, BookOpen, Sparkles } from "lucide-react";

export default function Donate() {
  const [amount, setAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");

  const createCheckoutMutation = trpc.donations.createCheckout.useMutation();

  const presetAmounts = [10, 20, 50, 100];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;

    if (finalAmount < 1) {
      toast.error("Le montant minimum est de 1€");
      return;
    }

    try {
      const { checkoutUrl } = await createCheckoutMutation.mutateAsync({
        amount: finalAmount,
        donorName: donorName || undefined,
        donorEmail: donorEmail || undefined,
        message: message || undefined,
      });

      if (checkoutUrl) {
        toast.info("Redirection vers la page de paiement...");
        window.open(checkoutUrl, "_blank");
      }
    } catch (error) {
      toast.error("Erreur lors de la création du paiement");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart size={48} className="text-hope-yellow" />
            <h1 className="text-4xl md:text-5xl font-bold">Faire un don</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Votre soutien nous permet de continuer notre mission contre le harcèlement
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-hope-purple">
            Votre impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users size={48} className="mx-auto mb-4 text-hope-purple" />
                <h3 className="text-xl font-semibold mb-2">10€</h3>
                <p className="text-gray-600">
                  Permet de sensibiliser une classe entière aux dangers du harcèlement
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen size={48} className="mx-auto mb-4 text-hope-blue" />
                <h3 className="text-xl font-semibold mb-2">50€</h3>
                <p className="text-gray-600">
                  Finance des ressources pédagogiques pour plusieurs écoles
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles size={48} className="mx-auto mb-4 text-hope-yellow" />
                <h3 className="text-xl font-semibold mb-2">100€</h3>
                <p className="text-gray-600">
                  Organise une journée complète de sensibilisation dans une école
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Choisissez votre montant</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonate} className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-sm font-medium mb-3">Montant suggéré</label>
                  <div className="grid grid-cols-4 gap-3">
                    {presetAmounts.map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={amount === preset && !customAmount ? "default" : "outline"}
                        className={amount === preset && !customAmount ? "bg-hope-purple" : ""}
                        onClick={() => {
                          setAmount(preset);
                          setCustomAmount("");
                        }}
                      >
                        {preset}€
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">Autre montant</label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Montant personnalisé"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pr-12"
                    />
                    <Euro className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <label className="block text-sm font-medium mb-2">Votre nom (optionnel)</label>
                  <Input
                    type="text"
                    placeholder="Jean Dupont"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Votre email (optionnel)</label>
                  <Input
                    type="email"
                    placeholder="jean.dupont@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message (optionnel)</label>
                  <Textarea
                    placeholder="Votre message de soutien..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-hope-purple hover:bg-hope-purple/90 text-lg py-6"
                  disabled={createCheckoutMutation.isPending}
                >
                  <Heart size={20} className="mr-2" />
                  {createCheckoutMutation.isPending
                    ? "Préparation..."
                    : `Faire un don de ${customAmount || amount}€`}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Paiement sécurisé par Stripe
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
