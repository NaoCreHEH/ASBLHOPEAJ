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

export default function AdminTeam() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const { data: members, refetch } = trpc.team.listAll.useQuery();
  const createMutation = trpc.team.create.useMutation();
  const updateMutation = trpc.team.update.useMutation();
  const deleteMutation = trpc.team.delete.useMutation();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
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
    if (editingMember) {
      setFormData({
        name: editingMember.name || "",
        role: editingMember.role || "",
        bio: editingMember.bio || "",
        imageUrl: editingMember.imageUrl || null,
        displayOrder: editingMember.displayOrder || 0,
        isActive: editingMember.isActive ?? true,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        bio: "",
        imageUrl: null,
        displayOrder: 0,
        isActive: true,
      });
    }
  }, [editingMember]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        await updateMutation.mutateAsync({
          id: editingMember.id,
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        toast.success("Membre mis à jour avec succès");
      } else {
        await createMutation.mutateAsync({
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        toast.success("Membre créé avec succès");
      }
      
      setIsDialogOpen(false);
      setEditingMember(null);
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Membre supprimé avec succès");
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
              <h1 className="text-3xl font-bold">Gestion de l'Équipe</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-hope-yellow text-black hover:bg-hope-yellow/90"
                  onClick={() => setEditingMember(null)}
                >
                  <Plus size={20} className="mr-2" />
                  Nouveau membre
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Modifier le membre" : "Nouveau membre"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <ImageUpload
                    currentImageUrl={formData.imageUrl}
                    folder="team"
                    onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
                    onImageRemoved={() => setFormData({ ...formData, imageUrl: null })}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rôle</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Biographie</label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
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
                      {editingMember ? "Mettre à jour" : "Créer"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingMember(null);
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members?.map((member) => (
            <Card key={member.id} className="border-2">
              <CardHeader className="bg-hope-green text-white">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-hope-purple p-1"
                      onClick={() => {
                        setEditingMember(member);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 p-1"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="font-semibold text-gray-700 mb-2">{member.role}</p>
                {member.bio && <p className="text-sm text-gray-600 mb-2">{member.bio}</p>}
                <div className="text-sm">
                  <span className="font-semibold text-gray-600">Statut : </span>
                  <span className={member.isActive ? "text-green-600" : "text-red-600"}>
                    {member.isActive ? "Actif" : "Inactif"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
