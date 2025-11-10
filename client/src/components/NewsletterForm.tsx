import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await subscribeMutation.mutateAsync({
        email,
        name: name || undefined,
      });

      if (result.success) {
        toast.success(result.message || "Merci pour votre inscription !");
        setEmail("");
        setName("");
      } else {
        toast.error(result.message || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="text-white" size={24} />
        <h3 className="text-xl font-semibold text-white">Newsletter</h3>
      </div>
      <p className="text-sm text-white/90 mb-4">
        Restez informé de nos actualités et événements
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Votre nom (optionnel)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
        />
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
        />
        <Button
          type="submit"
          className="w-full bg-white text-hope-purple hover:bg-white/90"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? "Inscription..." : "S'inscrire"}
        </Button>
      </form>
    </div>
  );
}
