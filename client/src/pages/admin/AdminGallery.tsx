import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

export default function AdminGallery() {
  const { data: images, isLoading, refetch } = trpc.gallery.getAll.useQuery();
  const { data: projects } = trpc.projects.list.useQuery();
  const createMutation = trpc.gallery.create.useMutation();
  const deleteMutation = trpc.gallery.delete.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectId: undefined as number | undefined,
    category: "",
    displayOrder: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast.error("Veuillez uploader une image");
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      toast.success("Image ajoutée à la galerie");
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        projectId: undefined,
        category: "",
        displayOrder: 0,
      });
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Image supprimée");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (isLoading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-hope-purple">Galerie Photos</h1>
          <p className="text-gray-600 mt-2">
            Gérez les photos des projets et événements
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-hope-purple hover:bg-hope-purple/90"
        >
          <Plus size={20} className="mr-2" />
          {showForm ? "Annuler" : "Ajouter une photo"}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle photo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre *</label>
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
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Projet associé (optionnel)</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.projectId || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectId: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                >
                  <option value="">Aucun projet</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Événement, Atelier, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ordre d'affichage</label>
                <Input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, displayOrder: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image *</label>
                <ImageUpload
                  onUploadComplete={(url) => setFormData({ ...formData, imageUrl: url })}
                  currentImage={formData.imageUrl}
                />
              </div>

              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Ajout en cours..." : "Ajouter à la galerie"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images && images.length > 0 ? (
          images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {image.description}
                  </p>
                )}
                {image.category && (
                  <span className="text-xs bg-hope-purple/10 text-hope-purple px-2 py-1 rounded">
                    {image.category}
                  </span>
                )}
                <Button
                  onClick={() => handleDelete(image.id)}
                  variant="destructive"
                  size="sm"
                  className="w-full mt-4"
                >
                  <Trash2 size={16} className="mr-2" />
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">
            Aucune photo dans la galerie. Ajoutez-en une pour commencer !
          </p>
        )}
      </div>
    </div>
  );
}
