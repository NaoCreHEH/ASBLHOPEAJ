import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import GallerySection from "@/components/GallerySection";

const defaultProjects = [
  {
    title: "Action à Charleroi",
    location: "Centre scolaire Catholique Saint-Joseph-Notre-Dame de Jumet",
    description:
      "L'ASBL HOPE Action Jeunesse a eu le plaisir d'intervenir pour une journée de sensibilisation au harcèlement. Tout au long de la journée, nous avons eu l'opportunité d'échanger avec plusieurs classes autour de débats et de discussions participatives. Ces moments de dialogue ont permis aux élèves de mieux comprendre les mécanismes du harcèlement, de prendre conscience de ses conséquences et d'explorer ensemble des solutions concrètes.",
  },
  {
    title: "Action à Mons",
    location: "École des Ursulines de Mons",
    description:
      "L'ASBL HOPE Action Jeunesse a eu l'honneur d'intervenir pendant une semaine complète de sensibilisation au harcèlement. Cette initiative a permis de mobiliser l'ensemble de l'école autour de thématiques cruciales telles que le harcèlement scolaire et le cyberharcèlement. Tout au long de la semaine, des activités interactives, jeu grandeur nature, des discussions avec des élèves ont été organisés, leur offrant un espace d'expression libre et bienveillant.",
  },
  {
    title: "Intervention à la FUCAM",
    location: "FUCAM à Mons",
    description:
      "L'ASBL HOPE-AJ a eu l'opportunité de se rendre à la FUCAM à Mons pour rencontrer les étudiants de Bac 2 et 3 en communication, sciences politiques et sciences humaines et sociales. Ces étudiants ont travaillé sur un audit de notre ASBL, basé sur trois axes principaux : la communication événementielle, la communication sur les réseaux sociaux et la stratégie financière. Leur professionnalisme, leur implication et la qualité de leurs propositions étaient impressionnants.",
  },
  {
    title: "Sensibilisation au Cyberharcèlement",
    location: "École Communale d'Élouges",
    description:
      "Le Plan de Cohésion Sociale de Dour a organisé une intervention collaborative impliquant plusieurs acteurs locaux, notamment HOPE-AJ, la police des Hauts-Pays, le service d'aide aux victimes, le PMS et l'AMO Parler pour le dire. Ensemble, nous avons animé deux sessions de sensibilisation sur le cyberharcèlement auprès des élèves de 5e et 6e primaire. Un projet pédagogique et artistique a été lancé, visant à sensibiliser les élèves aux dangers du cyberharcèlement avec la création d'une fresque murale.",
  },
  {
    title: "La classe Partage",
    location: "Institut d'Enseignement Secondaire Paramédical Province",
    description:
      "La classe partage est un lieu de rassemblement dans les écoles où des étudiants de 6ème secondaire s'occupent d'animer une classe deux fois par semaine sur le temps de midi pour des élèves de classes inférieures qui souhaitent se créer des relations amicales, éviter l'isolement et contrer le harcèlement. Cette classe est animée par des jeux de sociétés, des débats et des intervenants extérieurs.",
  },
];

export default function Projets() {
  const { data: projectsFromDb, isLoading } = trpc.projects.list.useQuery();
  const projects = projectsFromDb && projectsFromDb.length > 0 ? projectsFromDb : defaultProjects;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-hope-yellow text-black py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Nos Projets
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Découvrez nos actions concrètes et projets inspirants en images.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Chargement...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={'id' in project ? (project as any).id : index}
                className="border-2 border-hope-blue hover:shadow-xl transition-shadow"
              >
                {('imageUrl' in project && project.imageUrl) ? (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={project.imageUrl as string}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <CardHeader className="bg-gradient-blue-purple text-white">
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <p className="text-sm opacity-90">{project.location}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <GallerySection />

      <Footer />
    </div>
  );
}
