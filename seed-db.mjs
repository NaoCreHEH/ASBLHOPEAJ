import { drizzle } from "drizzle-orm/mysql2";
import { services, projects, teamMembers } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const initialServices = [
  {
    title: "Trivial Poursuit Géant",
    description: "Trivial poursuit géant réalisé dans une cour de récréation revisité sur les sujets suivants : Harcèlement, Cyber harcèlement, Discrimination, Consentement, Isolement, Agression sexuelle",
    flower: "Iris (Iris germanica)",
    flowerMeaning: "L'iris symbolise la sagesse, l'espoir et la communication. C'est une fleur qui évoque également la diversité et l'harmonie.",
    targetAudience: "Fin primaire (5,6èmes) et début secondaire (jusqu'à 2 secondaires)",
    duration: "4h (2h d'installation - 2h de jeux)",
    price: "60€",
    details: "Outils pédagogique contre le harcèlement scolaire",
    displayOrder: 1,
    isActive: true,
  },
  {
    title: "Sensibilisation au harcèlement",
    description: "Un cercle de paroles est organisé dans un local ou une classe où les élèves et un membre de l'ASBL sont mis en rond pour avoir une approche d'égal à égal. La discussion parle en grande partie du harcèlement en passant par des histoires personnelles de nos membres.",
    flower: "Chardon (Cirsium vulgare)",
    flowerMeaning: "Le chardon symbolise la protection et la défense. Il reflète le courage face à l'adversité, ainsi que la volonté de se défendre contre les comportements intrusifs.",
    targetAudience: "Primaire et secondaire (max 20 personnes par groupe)",
    duration: "1h",
    price: "20€ par classe (15€ si minimum 3 classes)",
    details: "Débat/discussions",
    displayOrder: 2,
    isActive: true,
  },
  {
    title: "Formation sur le cyber-harcèlement",
    description: "Formation destinée aux parents pour les sensibiliser aux dangers du cyber-harcèlement et leur donner des outils pour protéger leurs enfants.",
    flower: "Bleuet (Centaurea cyanus)",
    flowerMeaning: "Le bleuet est le symbole de la délicatesse et de la résilience dans un monde numérique parfois hostile. Il rappelle également la nécessité de cultiver la gentillesse et la compassion en ligne.",
    targetAudience: "Parents d'élèves",
    duration: "1h30",
    price: "60€",
    details: "Pour parents d'élèves",
    displayOrder: 3,
    isActive: true,
  },
];

const initialProjects = [
  {
    title: "Action à Charleroi",
    location: "Centre scolaire Catholique Saint-Joseph-Notre-Dame de Jumet",
    description: "L'ASBL HOPE Action Jeunesse a eu le plaisir d'intervenir pour une journée de sensibilisation au harcèlement. Tout au long de la journée, nous avons eu l'opportunité d'échanger avec plusieurs classes autour de débats et de discussions participatives. Ces moments de dialogue ont permis aux élèves de mieux comprendre les mécanismes du harcèlement, de prendre conscience de ses conséquences et d'explorer ensemble des solutions concrètes.",
    displayOrder: 1,
    isActive: true,
  },
  {
    title: "Action à Mons",
    location: "École des Ursulines de Mons",
    description: "L'ASBL HOPE Action Jeunesse a eu l'honneur d'intervenir pendant une semaine complète de sensibilisation au harcèlement. Cette initiative a permis de mobiliser l'ensemble de l'école autour de thématiques cruciales telles que le harcèlement scolaire et le cyberharcèlement. Tout au long de la semaine, des activités interactives, jeu grandeur nature, des discussions avec des élèves ont été organisés, leur offrant un espace d'expression libre et bienveillant.",
    displayOrder: 2,
    isActive: true,
  },
  {
    title: "Intervention à la FUCAM",
    location: "FUCAM à Mons",
    description: "L'ASBL HOPE-AJ a eu l'opportunité de se rendre à la FUCAM à Mons pour rencontrer les étudiants de Bac 2 et 3 en communication, sciences politiques et sciences humaines et sociales. Ces étudiants ont travaillé sur un audit de notre ASBL, basé sur trois axes principaux : la communication événementielle, la communication sur les réseaux sociaux et la stratégie financière. Leur professionnalisme, leur implication et la qualité de leurs propositions étaient impressionnants.",
    displayOrder: 3,
    isActive: true,
  },
  {
    title: "Sensibilisation au Cyberharcèlement",
    location: "École Communale d'Élouges",
    description: "Le Plan de Cohésion Sociale de Dour a organisé une intervention collaborative impliquant plusieurs acteurs locaux, notamment HOPE-AJ, la police des Hauts-Pays, le service d'aide aux victimes, le PMS et l'AMO Parler pour le dire. Ensemble, nous avons animé deux sessions de sensibilisation sur le cyberharcèlement auprès des élèves de 5e et 6e primaire. Un projet pédagogique et artistique a été lancé, visant à sensibiliser les élèves aux dangers du cyberharcèlement avec la création d'une fresque murale.",
    displayOrder: 4,
    isActive: true,
  },
  {
    title: "La classe Partage",
    location: "Institut d'Enseignement Secondaire Paramédical Province",
    description: "La classe partage est un lieu de rassemblement dans les écoles où des étudiants de 6ème secondaire s'occupent d'animer une classe deux fois par semaine sur le temps de midi pour des élèves de classes inférieures qui souhaitent se créer des relations amicales, éviter l'isolement et contrer le harcèlement. Cette classe est animée par des jeux de sociétés, des débats et des intervenants extérieurs.",
    displayOrder: 5,
    isActive: true,
  },
];

const initialTeamMembers = [
  {
    name: "Romain Lienard",
    role: "Fondateur et chef de projet",
    bio: "Fondateur passionné de Hope Action Jeunesse, Romain a transformé son expérience personnelle du harcèlement en une mission pour aider les jeunes en difficulté.",
    displayOrder: 1,
    isActive: true,
  },
  {
    name: "Erwin Desmet",
    role: "Secrétaire et Coordinateur",
    bio: "Erwin coordonne les activités de l'ASBL et assure la liaison entre les différents projets et partenaires.",
    displayOrder: 2,
    isActive: true,
  },
  {
    name: "Charles Hamaide",
    role: "Trésorier et Graphiste",
    bio: "Charles gère les finances de l'ASBL et crée les supports visuels pour nos campagnes de sensibilisation.",
    displayOrder: 3,
    isActive: true,
  },
  {
    name: "Killian Poglajen",
    role: "IT Manager",
    bio: "Killian s'occupe de la gestion technique et du développement des outils numériques de l'ASBL.",
    displayOrder: 4,
    isActive: true,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Insert services
    console.log("📦 Inserting services...");
    for (const service of initialServices) {
      await db.insert(services).values(service);
    }
    console.log(`✅ ${initialServices.length} services inserted`);

    // Insert projects
    console.log("📦 Inserting projects...");
    for (const project of initialProjects) {
      await db.insert(projects).values(project);
    }
    console.log(`✅ ${initialProjects.length} projects inserted`);

    // Insert team members
    console.log("📦 Inserting team members...");
    for (const member of initialTeamMembers) {
      await db.insert(teamMembers).values(member);
    }
    console.log(`✅ ${initialTeamMembers.length} team members inserted`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
