import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";

export default function AdminServices() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const { data: services, refetch } = trpc.services.listAll.useQuery();
  const createMutation = trpc.services.create.useMutation();
  const updateMutation = trpc.services.update.useMutation();
  const deleteMutation = trpc.services.delete.useMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    flower: "",
    flowerMeaning: "",
    targetAudience: "",
    duration: "",
    price: "",
    details: "",
    imageUrl: null as string | null,
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/admin/login");
    }
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title || "",
        description: editingService.description || "",
        flower: editingService.flower || "",
        flowerMeaning: editingService.flowerMeaning || "",
        targetAudience: editingService.targetAudience || "",
        duration: editingService.duration || "",
        price: editingService.price || "",
        details: editingService.details || "",
        imageUrl: editingService.imageUrl || null,
        displayOrder: editingService.displayOrder || 0,
        isActive: editingService.isActive ?? true,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        flower: "",
        flowerMeaning: "",
        targetAudience: "",
        duration: "",
        price: "",
        details: "",
        imageUrl: null,
        displayOrder: 0,
        isActive: true,
      });
    }
  }, [editingService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await updateMutation.mutateAsync({
          id: editingService.id,
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        toast.success("Service mis à jour avec succès");
      } else {
        await createMutation.mutateAsync({
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        toast.success("Service créé avec succès");
      }
      
      setIsDialogOpen(false);
      setEditingService(null);
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Service supprimé avec succès");
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Gestion des Services</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-hope-yellow text-black hover:bg-hope-yellow/90"
                  onClick={() => setEditingService(null)}
                >
                  <Plus size={20} className="mr-2" />
                  Nouveau service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? "Modifier le service" : "Nouveau service"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <ImageUpload
                    currentImageUrl={formData.imageUrl}
                    folder="services"
                    onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
                    onImageRemoved={() => setFormData({ ...formData, imageUrl: null })}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fleur symbolique</label>
                    <Input
                      value={formData.flower}
                      onChange={(e) => setFormData({ ...formData, flower: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Signification de la fleur</label>
                    <Textarea
                      value={formData.flowerMeaning}
                      onChange={(e) => setFormData({ ...formData, flowerMeaning: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Public cible</label>
                    <Input
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Durée</label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Prix</label>
                      <Input
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Détails supplémentaires</label>
                    <Textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ordre d'affichage</label>
                      <Input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <label htmlFor="isActive" className="text-sm font-medium">Actif</label>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-hope-purple hover:bg-hope-purple/90">
                      {editingService ? "Mettre à jour" : "Créer"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingService(null);
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-6">
          {services?.map((service) => (
            <Card key={service.id} className="border-2">
              <CardHeader className="bg-gradient-purple-blue text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <p className="text-sm opacity-90 mt-1">{service.flower}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple"
                      onClick={() => {
                        setEditingService(service);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-red-600"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Description</p>
                    <p className="text-gray-800">{service.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Public : </span>
                      <span className="text-gray-800">{service.targetAudience}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Durée : </span>
                      <span className="text-gray-800">{service.duration}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Prix : </span>
                      <span className="text-gray-800">{service.price}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Statut : </span>
                      <span className={service.isActive ? "text-green-600" : "text-red-600"}>
                        {service.isActive ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
