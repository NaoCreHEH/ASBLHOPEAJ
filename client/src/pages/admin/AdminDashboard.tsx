import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  Users, 
  Mail,
  MessageSquare,
  Image,
  Newspaper,
  LogOut,
  Home,
  FolderOpen,
  Euro,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/login");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const menuItems = [
    {
      title: "Services",
      description: "Gérer les services proposés",
      icon: Briefcase,
      href: "/admin/services",
      color: "bg-hope-purple",
    },
    {
      title: "Projets",
      description: "Gérer les projets et actions",
      icon: FolderKanban,
      href: "/admin/projets",
      color: "bg-hope-blue",
    },
    {
      title: "Équipe",
      description: "Gérer les membres de l'équipe",
      icon: Users,
      href: "/admin/equipe",
      color: "bg-hope-green",
    },
    {
      title: "Messages",
      description: "Consulter les messages de contact",
      icon: Mail,
      href: "/admin/messages",
      color: "bg-hope-yellow text-black",
    },
    {
      title: "Témoignages",
      description: "Valider les témoignages des écoles",
      icon: MessageSquare,
      href: "/admin/temoignages",
      color: "bg-purple-500",
    },
    {
      title: "Galerie",
      description: "Gérer les photos des projets",
      icon: Image,
      href: "/admin/galerie",
      color: "bg-pink-500",
    },
    {
      title: "Newsletter",
      description: "Gérer les abonnés",
      icon: Newspaper,
      href: "/admin/newsletter",
      color: "bg-orange-500",
    },
    {
      title: "Ressources",
      description: "Gérer les fichiers téléchargeables",
      icon: FolderOpen,
      href: "/admin/ressources",
      color: "bg-teal-500",
    },
    {
      title: "Dons",
      description: "Consulter l'historique des dons",
      icon: Euro,
      href: "/admin/dons",
      color: "bg-green-600",
    },
    {
      title: "Événements",
      description: "Gérer le calendrier d'événements",
      icon: Calendar,
      href: "/admin/evenements",
      color: "bg-indigo-600",
    },
    {
      title: "Réservations",
      description: "Gérer les réservations d'événements",
      icon: Users,
      href: "/admin/reservations",
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-purple-blue text-white shadow-lg">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={32} />
              <div>
                <h1 className="text-3xl font-bold">Administration</h1>
                <p className="text-sm opacity-90">ASBL Hope Action Jeunesse</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple">
                  <Home size={20} className="mr-2" />
                  Retour au site
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple"
                onClick={() => logout()}
              >
                <LogOut size={20} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bienvenue, {user.name || "Administrateur"}
          </h2>
          <p className="text-gray-600">
            Gérez le contenu de votre site web depuis cet espace d'administration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-200 hover:border-hope-purple">
                <CardHeader className={`${item.color} text-white`}>
                  <item.icon size={48} className="mb-2" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
