import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SeoHelmet from "@/components/SeoHelmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState("");
  const [message, setMessage] = useState("");

  const { data: events } = trpc.events.getUpcoming.useQuery();
  const registerMutation = trpc.eventRegistrations.create.useMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent || !schoolName || !contactName || !contactEmail) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        eventId: selectedEvent.id,
        schoolName,
        contactName,
        contactEmail,
        contactPhone,
        numberOfParticipants: numberOfParticipants ? parseInt(numberOfParticipants) : undefined,
        message,
      });

      toast.success("Votre réservation a été envoyée avec succès !");
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la réservation");
    }
  };

  const resetForm = () => {
    setSchoolName("");
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setNumberOfParticipants("");
    setMessage("");
  };

  const openRegistrationDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <SeoHelmet
        title="Événements - ASBL Hope Action Jeunesse"
        description="Découvrez nos prochaines interventions et événements contre le harcèlement scolaire. Réservez une intervention pour votre école."
      />
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-purple-blue text-white py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos événements</h1>
            <p className="text-xl max-w-2xl">
              Découvrez nos prochaines interventions et réservez une session pour votre établissement scolaire.
            </p>
          </div>
        </section>

        {/* Events List */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-6">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-hope-purple to-hope-blue text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                          {event.eventType && (
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                              {event.eventType}
                            </span>
                          )}
                        </div>
                        <Calendar size={32} />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {event.description && (
                        <p className="text-gray-700 mb-4">{event.description}</p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={20} className="text-hope-purple" />
                          <div>
                            <div className="font-medium">{formatDate(event.startDate)}</div>
                            <div className="text-sm">{formatTime(event.startDate)}</div>
                          </div>
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={20} className="text-hope-blue" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        {event.maxParticipants && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users size={20} className="text-hope-green" />
                            <span>
                              {event.currentParticipants || 0}/{event.maxParticipants} places
                            </span>
                          </div>
                        )}

                        {event.endDate && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={20} className="text-hope-yellow" />
                            <span>Jusqu'à {formatTime(event.endDate)}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => openRegistrationDialog(event)}
                        className="bg-hope-purple hover:bg-hope-purple/90"
                        disabled={
                          event.maxParticipants &&
                          event.currentParticipants >= event.maxParticipants
                        }
                      >
                        {event.maxParticipants && event.currentParticipants >= event.maxParticipants
                          ? "Complet"
                          : "Réserver"}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-xl text-gray-600">Aucun événement à venir pour le moment</p>
                  <p className="text-gray-500 mt-2">Revenez bientôt pour découvrir nos prochaines interventions</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Réserver : {selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de l'école *</label>
              <Input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="École primaire Saint-Joseph"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom du contact *</label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Jean Dupont"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@ecole.be"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+32 2 123 45 67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre de participants</label>
                <Input
                  type="number"
                  value={numberOfParticipants}
                  onChange={(e) => setNumberOfParticipants(e.target.value)}
                  placeholder="25"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Informations complémentaires..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-hope-purple" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Envoi..." : "Envoyer la réservation"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
