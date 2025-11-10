import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { Star } from "lucide-react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    content: "",
    rating: 5,
    email: "",
  });

  const submitMutation = trpc.testimonials.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        organization: formData.organization,
        role: formData.role || undefined,
        content: formData.content,
        rating: formData.rating,
        email: formData.email || undefined,
      });

      toast.success("Merci pour votre témoignage ! Il sera publié après validation.");
      
      // Reset form
      setFormData({
        name: "",
        organization: "",
        role: "",
        content: "",
        rating: 5,
        email: "",
      });
    } catch (error) {
      toast.error("Erreur lors de l'envoi du témoignage");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-hope-purple">
          Partagez votre expérience
        </CardTitle>
        <p className="text-gray-600">
          Votre témoignage sera publié après validation par notre équipe
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nom complet *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Organisation / École *
            </label>
            <Input
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
              placeholder="École Primaire de Bruxelles"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Fonction (optionnel)
            </label>
            <Input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Directeur, Enseignant, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email (optionnel)
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Évaluation *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    size={32}
                    className={
                      star <= formData.rating
                        ? "fill-hope-yellow text-hope-yellow"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Votre témoignage *
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
              placeholder="Partagez votre expérience avec ASBL Hope..."
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 caractères
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-hope-purple hover:bg-hope-purple/90"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? "Envoi en cours..." : "Envoyer mon témoignage"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
