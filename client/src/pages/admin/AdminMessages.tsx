import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, MailOpen, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminMessages() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: messages, refetch } = trpc.contact.listAll.useQuery();
  const markAsReadMutation = trpc.contact.markAsRead.useMutation();
  const deleteMutation = trpc.contact.delete.useMutation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/admin/login");
    }
  }, [user, loading, setLocation]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id });
      toast.success("Message marqué comme lu");
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Message supprimé avec succès");
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  if (loading || !user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-purple-blue text-white shadow-lg">
        <div className="container mx-auto py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Messages de Contact</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-4">
          {messages?.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                Aucun message pour le moment
              </CardContent>
            </Card>
          )}
          {messages?.map((message) => (
            <Card key={message.id} className={`border-2 ${message.isRead ? 'bg-gray-50' : 'bg-white border-hope-yellow'}`}>
              <CardHeader className={message.isRead ? 'bg-gray-100' : 'bg-hope-yellow/10'}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {message.isRead ? (
                      <MailOpen size={24} className="text-gray-400 mt-1" />
                    ) : (
                      <Mail size={24} className="text-hope-purple mt-1" />
                    )}
                    <div>
                      <CardTitle className="text-xl">{message.name}</CardTitle>
                      <p className="text-sm text-gray-600">{message.email}</p>
                      {message.subject && (
                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          Sujet: {message.subject}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!message.isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-hope-purple text-hope-purple hover:bg-hope-purple hover:text-white"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <MailOpen size={16} className="mr-1" />
                        Marquer comme lu
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
