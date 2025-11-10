import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useUtils } from "@trpc/react-query";
import { toast } from "sonner";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Login() {
  const utils = trpc.useUtils();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur de connexion");
      }

      // Store token in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Connexion réussie !");

      // Force useAuth to re-fetch user data
      // Invalidate the auth query to force useAuth to re-fetch user data
      // This is necessary because useAuth relies on trpc.auth.me.useQuery
      utils.auth.me.invalidate();
      
      // Redirect to admin dashboard
      setLocation("/admin");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-purple-blue p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {APP_LOGO && (
            <img
              src={APP_LOGO}
              alt={APP_TITLE}
              className="h-16 mx-auto mb-4"
            />
          )}
          <CardTitle className="text-2xl">Connexion Administrateur</CardTitle>
          <p className="text-sm text-gray-600 mt-2">{APP_TITLE}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@asbl-hope.org"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-hope-purple hover:bg-hope-purple/90"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
