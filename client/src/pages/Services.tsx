import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

const defaultServices = [
  {
    title: "Trivial Poursuit Géant",
    subtitle: "Outils pédagogique contre le harcèlement scolaire",
    flower: "Iris (Iris germanica)",
    flowerMeaning:
      "L'iris symbolise la sagesse, l'espoir et la communication. C'est une fleur qui évoque également la diversité et l'harmonie.",
    description:
      "Trivial poursuit géant réalisé dans une cour de récréation revisité sur les sujets suivants : Harcèlement, Cyber harcèlement, Discrimination, Consentement, Isolement, Agression sexuelle",
    targetAudience: "Fin primaire (5,6èmes) et début secondaire (jusqu'à 2 secondaires)",
    duration: "4h (2h d'installation - 2h de jeux)",
    price: "60€",
    icon: "🌺",
  },
  {
    title: "Sensibilisation au harcèlement",
    subtitle: "Débat/discussions",
    flower: "Chardon (Cirsium vulgare)",
    flowerMeaning:
      "Le chardon symbolise la protection et la défense. Il reflète le courage face à l'adversité, ainsi que la volonté de se défendre contre les comportements intrusifs.",
    description:
      "Un cercle de paroles est organisé dans un local ou une classe où les élèves et un membre de l'ASBL sont mis en rond pour avoir une approche d'égal à égal. La discussion parle en grande partie du harcèlement en passant par des histoires personnelles de nos membres.",
    targetAudience: "Primaire et secondaire (max 20 personnes par groupe)",
    duration: "1h",
    price: "20€ par classe (15€ si minimum 3 classes)",
    icon: "🌿",
  },
  {
    title: "Formation sur le cyber-harcèlement",
    subtitle: "Pour parents d'élèves",
    flower: "Bleuet (Centaurea cyanus)",
    flowerMeaning:
      "Le bleuet est le symbole de la délicatesse et de la résilience dans un monde numérique parfois hostile. Il rappelle également la nécessité de cultiver la gentillesse et la compassion en ligne.",
    description:
      "Formation destinée aux parents pour les sensibiliser aux dangers du cyber-harcèlement et leur donner des outils pour protéger leurs enfants.",
    targetAudience: "Parents d'élèves",
    duration: "1h30",
    price: "60€",
    icon: "💐",
  },
];

export default function Services() {
  const { data: servicesFromDb, isLoading } = trpc.services.list.useQuery();
  const services = servicesFromDb && servicesFromDb.length > 0 ? servicesFromDb : defaultServices;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-hope-yellow text-black py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Nos services
          </h1>
          <p className="text-xl text-center max-w-4xl mx-auto leading-relaxed">
            L'ASBL Hope Action Jeunesse propose des services personnalisés
            adaptés aux besoins spécifiques des écoles, centres et
            institutions. Nous offrons des animations sur mesure, qu'il
            s'agisse d'intervenir auprès d'une centaine d'élèves en une journée
            ou d'organiser une semaine complète de sensibilisation sur des
            thématiques comme le harcèlement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Chargement...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={'id' in service ? (service as any).id : index}
                className="border-2 border-hope-purple hover:shadow-xl transition-shadow"
              >
                <CardHeader className="bg-gradient-purple-blue text-white">
                  {('imageUrl' in service && service.imageUrl) ? (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg mb-4">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-5xl text-center mb-4">
                      {'icon' in service ? service.icon : '🌺'}
                    </div>
                  )}
                  <CardTitle className="text-2xl text-center">
                    {service.title}
                  </CardTitle>
                  {'subtitle' in service && (
                    <p className="text-center text-sm opacity-90">
                      {service.subtitle}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="font-semibold text-hope-purple mb-1">
                      Fleur symbolique :
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      {service.flower}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {service.flowerMeaning}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-hope-purple mb-1">
                      Description :
                    </p>
                    <p className="text-sm text-gray-700">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Public :
                      </span>{" "}
                      {service.targetAudience}
                    </div>
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Durée :
                      </span>{" "}
                      {service.duration}
                    </div>
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Prix :
                      </span>{" "}
                      {service.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
