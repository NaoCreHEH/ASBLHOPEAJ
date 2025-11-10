import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Plus, Trash2, Eye, EyeOff, MapPin, Users } from "lucide-react";

export default function AdminEvents() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const { data: events, refetch } = trpc.events.getAll.useQuery();
  const createMutation = trpc.events.create.useMutation();
  const updateMutation = trpc.events.update.useMutation();
  const deleteMutation = trpc.events.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !startDate) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        eventType,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
      });

      toast.success("Événement ajouté avec succès");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'événement");
    }
  };

  const handleTogglePublic = async (id: number, currentStatus: number) => {
    try {
      await updateMutation.mutateAsync({
        id,
        isPublic: currentStatus === 1 ? 0 : 1,
      });
      toast.success("Visibilité mise à jour");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Événement supprimé");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setEventType("");
    setMaxParticipants("");
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des événements</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-hope-purple">
          <Plus size={20} className="mr-2" />
          Ajouter un événement
        </Button>
      </div>

      <div className="grid gap-4">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Calendar size={32} className="text-hope-purple flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.maxParticipants && (
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>
                              {event.currentParticipants || 0}/{event.maxParticipants} participants
                            </span>
                          </div>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : event.status === "ongoing"
                              ? "bg-green-100 text-green-700"
                              : event.status === "completed"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {event.status === "upcoming"
                            ? "À venir"
                            : event.status === "ongoing"
                            ? "En cours"
                            : event.status === "completed"
                            ? "Terminé"
                            : "Annulé"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublic(event.id, event.isPublic)}
                    >
                      {event.isPublic === 1 ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">Aucun événement</p>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un événement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Intervention anti-harcèlement"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'événement..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date de début *</label>
                <Input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date de fin</label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lieu</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="École primaire XYZ, Bruxelles"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type d'événement</label>
                <Input
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="Intervention, Formation, Atelier..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre max de participants</label>
                <Input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-hope-purple" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Ajout..." : "Ajouter"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
