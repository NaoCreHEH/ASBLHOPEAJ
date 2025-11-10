import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

const defaultTeamMembers = [
  {
    name: "Romain Lienard",
    role: "Fondateur et chef de projet",
    icon: "👨‍💼",
  },
  {
    name: "Erwin Desmet",
    role: "Secrétaire et Coordinateur",
    icon: "📋",
  },
  {
    name: "Charles Hamaide",
    role: "Trésorier et Graphiste",
    icon: "🎨",
  },
  {
    name: "Killian Poglajen",
    role: "IT Manager",
    icon: "💻",
  },
];

export default function About() {
  const { data: teamFromDb, isLoading } = trpc.team.list.useQuery();
  const teamMembers = teamFromDb && teamFromDb.length > 0 ? teamFromDb : defaultTeamMembers;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            À propos
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-hope-purple">HOPE</strong> est une ASBL
              fondée avec la conviction profonde que chacun mérite de vivre
              dans un environnement sûr, respectueux et épanouissant, à l'abri
              du harcèlement. Notre mission est de redonner espoir à ceux qui
              en ont le plus besoin, en offrant un soutien concret, en
              sensibilisant le public, et en créant des espaces de dialogue et
              de partage.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Née d'une expérience personnelle de harcèlement, HOPE est le
              fruit d'un désir ardent de transformer une douleur individuelle
              en une force collective. Nous croyons que le changement commence
              par la parole et la solidarité. C'est pourquoi nous travaillons
              avec les jeunes, les parents, les écoles et la communauté au sens
              large pour construire ensemble des solutions durables contre les
              problèmes d'harcèlement, d'isolement, de confiance...
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-hope-purple">
              <CardContent className="pt-6">
                <div className="text-4xl text-center mb-4">🤝</div>
                <h3 className="text-xl font-bold text-hope-purple mb-3 text-center">
                  Soutien et accompagnement
                </h3>
                <p className="text-gray-700 text-center">
                  Nous offrons un espace d'écoute et d'entraide pour les
                  victimes de harcèlement, les aidant à retrouver leur
                  confiance et à envisager un avenir meilleur.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-hope-blue">
              <CardContent className="pt-6">
                <div className="text-4xl text-center mb-4">📢</div>
                <h3 className="text-xl font-bold text-hope-blue mb-3 text-center">
                  Sensibilisation et prévention
                </h3>
                <p className="text-gray-700 text-center">
                  À travers des ateliers, des campagnes et des projets comme
                  « Classe Partage », nous visons à éduquer et à sensibiliser
                  le public aux dangers du harcèlement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-hope-green">
              <CardContent className="pt-6">
                <div className="text-4xl text-center mb-4">🌍</div>
                <h3 className="text-xl font-bold text-hope-green mb-3 text-center">
                  Engagement communautaire
                </h3>
                <p className="text-gray-700 text-center">
                  Nous croyons en la puissance de l'action collective. En
                  impliquant les jeunes, les familles et les institutions, nous
                  créons un réseau solidaire et engagé.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-hope-purple mb-6 text-center">
              Notre équipe
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Notre équipe est composée de passionnés qui dédient leurs vies à
              l'autre. Chacun de nous apporte son expertise unique, que ce soit
              en éducation, en psychologie, ou en communication, pour créer un
              environnement sûr et bienveillant pour les jeunes.
            </p>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Chargement...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card
                    key={'id' in member ? (member as any).id : index}
                    className="border-2 border-hope-purple hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6 text-center">
                      {('imageUrl' in member && member.imageUrl) ? (
                        <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                          <img
                            src={member.imageUrl as string}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-6xl mb-4">{'icon' in member ? member.icon : '👤'}</div>
                      )}
                      <h3 className="text-xl font-bold text-hope-purple mb-2">
                        {member.name}
                      </h3>
                      <p className="text-gray-600">{member.role}</p>
                      {('bio' in member && member.bio) && (
                        <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
