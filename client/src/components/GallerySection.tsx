import { trpc } from "@/lib/trpc";
import { Card } from "./ui/card";
import { Image as ImageIcon } from "lucide-react";

export default function GallerySection() {
  const { data: images, isLoading } = trpc.gallery.getAll.useQuery();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-hope-purple">
            Galerie Photos
          </h2>
          <p className="text-center text-gray-600">Chargement...</p>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4 text-hope-purple">
          Galerie Photos
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Découvrez nos projets et événements en images
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-square relative overflow-hidden">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
