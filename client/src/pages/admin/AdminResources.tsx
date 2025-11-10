import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { FileText, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

export default function AdminResources() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("");

  const { data: resources, refetch } = trpc.resources.getAll.useQuery();
  const createMutation = trpc.resources.create.useMutation();
  const updateMutation = trpc.resources.update.useMutation();
  const deleteMutation = trpc.resources.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !fileUrl || !fileName) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title,
        description,
        fileUrl,
        fileName,
        category,
      });

      toast.success("Ressource ajoutée avec succès");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la ressource");
    }
  };

  const handleToggleActive = async (id: number, currentStatus: number) => {
    try {
      await updateMutation.mutateAsync({
        id,
        isActive: currentStatus === 1 ? 0 : 1,
      });
      toast.success("Statut mis à jour");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Ressource supprimée");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFileUrl("");
    setFileName("");
    setCategory("");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des ressources</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-hope-purple">
          <Plus size={20} className="mr-2" />
          Ajouter une ressource
        </Button>
      </div>

      <div className="grid gap-4">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <FileText size={32} className="text-hope-purple flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{resource.title}</h3>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Fichier: {resource.fileName}</span>
                        {resource.category && <span>Catégorie: {resource.category}</span>}
                        <span>{resource.downloadCount || 0} téléchargements</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(resource.id, resource.isActive)}
                    >
                      {resource.isActive === 1 ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">Aucune ressource</p>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter une ressource</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Guide de prévention du harcèlement"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de la ressource..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Guides, Fiches pédagogiques, Présentations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fichier *</label>
              <ImageUpload
                onUploadComplete={(url) => {
                  setFileUrl(url);
                  const name = url.split("/").pop() || "document";
                  setFileName(name);
                }}
              />
              {fileUrl && (
                <p className="text-sm text-green-600 mt-2">Fichier uploadé: {fileName}</p>
              )}
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
