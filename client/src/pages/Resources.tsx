import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Download, FileText, FolderOpen } from "lucide-react";
import { toast } from "sonner";

export default function Resources() {
  const { data: resources, isLoading } = trpc.resources.getAll.useQuery();
  const incrementDownloadMutation = trpc.resources.incrementDownload.useMutation();

  const handleDownload = async (resource: any) => {
    try {
      await incrementDownloadMutation.mutateAsync({ id: resource.id });
      window.open(resource.fileUrl, "_blank");
      toast.success("Téléchargement démarré");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  const categories = resources
    ? Array.from(new Set(resources.map((r) => r.category).filter(Boolean)))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-blue-purple text-white py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FolderOpen size={48} />
            <h1 className="text-4xl md:text-5xl font-bold">Ressources</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Téléchargez nos guides, fiches pédagogiques et présentations pour vous accompagner
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <p className="text-center text-gray-600">Chargement...</p>
          ) : resources && resources.length > 0 ? (
            <>
              {categories.length > 0 ? (
                categories.map((category) => {
                  const categoryResources = resources.filter((r) => r.category === category);
                  return (
                    <div key={category} className="mb-12">
                      <h2 className="text-2xl font-bold mb-6 text-hope-purple">{category}</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryResources.map((resource) => (
                          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-start gap-3">
                                <FileText size={32} className="text-hope-purple flex-shrink-0" />
                                <CardTitle className="text-lg">{resource.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {resource.description && (
                                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                              )}
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <span>{resource.fileName}</span>
                                {resource.downloadCount > 0 && (
                                  <span>{resource.downloadCount} téléchargements</span>
                                )}
                              </div>
                              <Button
                                onClick={() => handleDownload(resource)}
                                className="w-full bg-hope-purple hover:bg-hope-purple/90"
                              >
                                <Download size={16} className="mr-2" />
                                Télécharger
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <FileText size={32} className="text-hope-purple flex-shrink-0" />
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {resource.description && (
                          <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>{resource.fileName}</span>
                          {resource.downloadCount > 0 && (
                            <span>{resource.downloadCount} téléchargements</span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleDownload(resource)}
                          className="w-full bg-hope-purple hover:bg-hope-purple/90"
                        >
                          <Download size={16} className="mr-2" />
                          Télécharger
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FolderOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Aucune ressource disponible pour le moment</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
