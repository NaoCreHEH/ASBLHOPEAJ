import { drizzle } from "drizzle-orm/mysql2";
import { services, projects, teamMembers, contactMessages } from "./drizzle/schema.ts";
import fs from "fs";

async function exportDatabase() {
  console.log("🔄 Export de la base de données...\n");

  const db = drizzle(process.env.DATABASE_URL);

  try {
    // Export services
    const servicesData = await db.select().from(services);
    console.log(`✅ ${servicesData.length} services exportés`);

    // Export projects
    const projectsData = await db.select().from(projects);
    console.log(`✅ ${projectsData.length} projets exportés`);

    // Export team members
    const teamData = await db.select().from(teamMembers);
    console.log(`✅ ${teamData.length} membres d'équipe exportés`);

    // Export contact messages
    const messagesData = await db.select().from(contactMessages);
    console.log(`✅ ${messagesData.length} messages exportés`);

    // Create export object
    const exportData = {
      exportDate: new Date().toISOString(),
      services: servicesData,
      projects: projectsData,
      teamMembers: teamData,
      contactMessages: messagesData,
    };

    // Write to file
    fs.writeFileSync(
      "database-export.json",
      JSON.stringify(exportData, null, 2)
    );

    console.log("\n✅ Export terminé ! Fichier: database-export.json");
  } catch (error) {
    console.error("❌ Erreur lors de l'export:", error);
    process.exit(1);
  }

  process.exit(0);
}

exportDatabase();
