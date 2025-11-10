import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Euro, Calendar, Mail, User, MessageSquare } from "lucide-react";

export default function AdminDonations() {
  const { data: donations, isLoading } = trpc.donations.getAll.useQuery();

  const totalAmount = donations?.reduce((sum, d) => sum + (d.status === "completed" ? d.amount : 0), 0) || 0;
  const completedCount = donations?.filter((d) => d.status === "completed").length || 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des dons</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Euro size={32} className="text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total des dons</p>
                <p className="text-2xl font-bold">{totalAmount}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <User size={32} className="text-hope-purple" />
              <div>
                <p className="text-sm text-gray-600">Dons complétés</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Euro size={32} className="text-hope-blue" />
              <div>
                <p className="text-sm text-gray-600">Don moyen</p>
                <p className="text-2xl font-bold">
                  {completedCount > 0 ? Math.round(totalAmount / completedCount) : 0}€
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Historique des dons</h2>
        {isLoading ? (
          <p className="text-center text-gray-600 py-8">Chargement...</p>
        ) : donations && donations.length > 0 ? (
          donations.map((donation) => (
            <Card key={donation.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-hope-purple">
                        {donation.amount}€
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          donation.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : donation.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {donation.status === "completed"
                          ? "Complété"
                          : donation.status === "pending"
                          ? "En attente"
                          : "Échoué"}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      {donation.donorName && (
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{donation.donorName}</span>
                        </div>
                      )}
                      {donation.donorEmail && (
                        <div className="flex items-center gap-2">
                          <Mail size={16} />
                          <span>{donation.donorEmail}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(donation.createdAt).toLocaleDateString("fr-FR")}</span>
                      </div>
                      {donation.stripePaymentIntentId && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-400">ID: {donation.stripePaymentIntentId.substring(0, 20)}...</span>
                        </div>
                      )}
                    </div>

                    {donation.message && (
                      <div className="mt-3 flex items-start gap-2 text-sm bg-gray-50 p-3 rounded">
                        <MessageSquare size={16} className="flex-shrink-0 mt-0.5" />
                        <p className="italic">{donation.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">Aucun don pour le moment</p>
        )}
      </div>
    </div>
  );
}
