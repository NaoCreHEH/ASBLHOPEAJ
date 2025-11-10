import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Mail, UserX } from "lucide-react";

export default function AdminNewsletter() {
  const { data: subscribers, isLoading, refetch } = trpc.newsletter.getAll.useQuery();
  const unsubscribeMutation = trpc.newsletter.unsubscribe.useMutation();
  const deleteMutation = trpc.newsletter.delete.useMutation();

  const handleUnsubscribe = async (email: string) => {
    if (!confirm("Êtes-vous sûr de vouloir désabonner cet utilisateur ?")) return;

    try {
      await unsubscribeMutation.mutateAsync({ email });
      toast.success("Utilisateur désabonné");
      refetch();
    } catch (error) {
      toast.error("Erreur lors du désabonnement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cet abonné ?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Abonné supprimé");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const exportEmails = () => {
    if (!subscribers) return;
    
    const activeEmails = subscribers
      .filter(s => s.status === "active")
      .map(s => s.email)
      .join(", ");
    
    navigator.clipboard.writeText(activeEmails);
    toast.success("Emails copiés dans le presse-papier");
  };

  if (isLoading) {
    return <div className="p-8">Chargement...</div>;
  }

  const activeSubscribers = subscribers?.filter(s => s.status === "active") || [];
  const unsubscribedUsers = subscribers?.filter(s => s.status === "unsubscribed") || [];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-hope-purple">Newsletter</h1>
          <p className="text-gray-600 mt-2">
            Gérez les abonnés à votre newsletter
          </p>
        </div>
        <Button
          onClick={exportEmails}
          className="bg-hope-purple hover:bg-hope-purple/90"
        >
          <Mail size={20} className="mr-2" />
          Exporter les emails actifs
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total d'abonnés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-hope-purple">
              {subscribers?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Abonnés actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {activeSubscribers.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Désabonnés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-400">
              {unsubscribedUsers.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscribers */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-hope-purple">
          Abonnés actifs ({activeSubscribers.length})
        </h2>
        <div className="grid gap-4">
          {activeSubscribers.length === 0 ? (
            <p className="text-gray-500">Aucun abonné actif</p>
          ) : (
            activeSubscribers.map((subscriber) => (
              <Card key={subscriber.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-hope-purple" />
                      <div>
                        <p className="font-semibold">{subscriber.email}</p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-600">{subscriber.name}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Inscrit le {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUnsubscribe(subscriber.email)}
                      variant="outline"
                      size="sm"
                    >
                      <UserX size={16} className="mr-2" />
                      Désabonner
                    </Button>
                    <Button
                      onClick={() => handleDelete(subscriber.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Unsubscribed Users */}
      {unsubscribedUsers.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Désabonnés ({unsubscribedUsers.length})
          </h2>
          <div className="grid gap-4">
            {unsubscribedUsers.map((subscriber) => (
              <Card key={subscriber.id} className="opacity-60">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-gray-400" />
                      <div>
                        <p className="font-semibold">{subscriber.email}</p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-600">{subscriber.name}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="bg-gray-100">
                        Désabonné
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Désabonné le{" "}
                      {subscriber.unsubscribedAt
                        ? new Date(subscriber.unsubscribedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDelete(subscriber.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
