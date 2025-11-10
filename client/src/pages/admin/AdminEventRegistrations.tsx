import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Mail, Phone, Users, Building, MessageSquare, Check, X } from "lucide-react";

export default function AdminEventRegistrations() {
  const { data: registrations, refetch } = trpc.eventRegistrations.getAll.useQuery();
  const updateStatusMutation = trpc.eventRegistrations.updateStatus.useMutation();
  const deleteMutation = trpc.eventRegistrations.delete.useMutation();

  const handleUpdateStatus = async (id: number, status: "confirmed" | "cancelled") => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      toast.success(`Réservation ${status === "confirmed" ? "confirmée" : "annulée"}`);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Réservation supprimée");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingCount = registrations?.filter((r) => r.status === "pending").length || 0;
  const confirmedCount = registrations?.filter((r) => r.status === "confirmed").length || 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Réservations d'événements</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar size={32} className="text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Check size={32} className="text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Confirmées</p>
                <p className="text-2xl font-bold">{confirmedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar size={32} className="text-hope-purple" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{registrations?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations List */}
      <div className="space-y-4">
        {registrations && registrations.length > 0 ? (
          registrations.map((registration) => (
            <Card key={registration.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">Événement #{registration.eventId}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          registration.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : registration.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {registration.status === "pending"
                          ? "En attente"
                          : registration.status === "confirmed"
                          ? "Confirmée"
                          : "Annulée"}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        <span className="font-medium">{registration.schoolName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{registration.contactName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{registration.contactEmail}</span>
                      </div>
                      {registration.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>{registration.contactPhone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{registration.numberOfParticipants || "Non spécifié"} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(registration.createdAt)}</span>
                      </div>
                    </div>

                    {registration.message && (
                      <div className="mt-3 flex items-start gap-2 text-sm bg-gray-50 p-3 rounded">
                        <MessageSquare size={16} className="flex-shrink-0 mt-0.5" />
                        <p className="italic">{registration.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {registration.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleUpdateStatus(registration.id, "confirmed")}
                        >
                          <Check size={16} className="mr-1" />
                          Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(registration.id, "cancelled")}
                        >
                          <X size={16} className="mr-1" />
                          Annuler
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(registration.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">Aucune réservation</p>
        )}
      </div>
    </div>
  );
}
