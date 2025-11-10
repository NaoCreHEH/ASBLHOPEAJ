import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, X, Trash2, Star } from "lucide-react";

export default function AdminTestimonials() {
  const { data: testimonials, isLoading, refetch } = trpc.testimonials.getAll.useQuery();
  const approveMutation = trpc.testimonials.approve.useMutation();
  const rejectMutation = trpc.testimonials.reject.useMutation();
  const deleteMutation = trpc.testimonials.delete.useMutation();

  const handleApprove = async (id: number) => {
    try {
      await approveMutation.mutateAsync({ id });
      toast.success("Témoignage approuvé");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectMutation.mutateAsync({ id });
      toast.success("Témoignage rejeté");
      refetch();
    } catch (error) {
      toast.error("Erreur lors du rejet");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Témoignage supprimé");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approuvé</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejeté</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-hope-yellow text-hope-yellow" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-8">Chargement...</div>;
  }

  const pendingTestimonials = testimonials?.filter(t => t.status === "pending") || [];
  const approvedTestimonials = testimonials?.filter(t => t.status === "approved") || [];
  const rejectedTestimonials = testimonials?.filter(t => t.status === "rejected") || [];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-hope-purple">Gestion des Témoignages</h1>
        <p className="text-gray-600 mt-2">
          Validez ou rejetez les témoignages soumis par les écoles et partenaires
        </p>
      </div>

      {/* En attente */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-hope-purple">
          En attente de validation ({pendingTestimonials.length})
        </h2>
        <div className="grid gap-4">
          {pendingTestimonials.length === 0 ? (
            <p className="text-gray-500">Aucun témoignage en attente</p>
          ) : (
            pendingTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-yellow-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {testimonial.organization}
                        {testimonial.role && ` - ${testimonial.role}`}
                      </p>
                      {renderStars(testimonial.rating)}
                    </div>
                    {getStatusBadge(testimonial.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  {testimonial.email && (
                    <p className="text-sm text-gray-500 mb-4">Email: {testimonial.email}</p>
                  )}
                  <p className="text-xs text-gray-400 mb-4">
                    Soumis le {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(testimonial.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Check size={16} className="mr-2" />
                      Approuver
                    </Button>
                    <Button
                      onClick={() => handleReject(testimonial.id)}
                      variant="destructive"
                    >
                      <X size={16} className="mr-2" />
                      Rejeter
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      variant="outline"
                      className="ml-auto"
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

      {/* Approuvés */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-hope-purple">
          Témoignages approuvés ({approvedTestimonials.length})
        </h2>
        <div className="grid gap-4">
          {approvedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-green-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {testimonial.organization}
                      {testimonial.role && ` - ${testimonial.role}`}
                    </p>
                    {renderStars(testimonial.rating)}
                  </div>
                  {getStatusBadge(testimonial.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleReject(testimonial.id)}
                    variant="outline"
                  >
                    <X size={16} className="mr-2" />
                    Rejeter
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    variant="outline"
                    className="ml-auto"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Rejetés */}
      {rejectedTestimonials.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-hope-purple">
            Témoignages rejetés ({rejectedTestimonials.length})
          </h2>
          <div className="grid gap-4">
            {rejectedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-red-200 opacity-60">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {testimonial.organization}
                        {testimonial.role && ` - ${testimonial.role}`}
                      </p>
                      {renderStars(testimonial.rating)}
                    </div>
                    {getStatusBadge(testimonial.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(testimonial.id)}
                      variant="outline"
                    >
                      <Check size={16} className="mr-2" />
                      Approuver
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      variant="outline"
                      className="ml-auto"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
