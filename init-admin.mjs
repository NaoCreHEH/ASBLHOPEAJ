import { createUser } from "./server/auth.ts";

async function main() {
  console.log("=== Création du compte administrateur ===\n");

  const name = "Admin ASBL Hope";
  const email = "admin@asbl-hope.org";
  const password = "ChangeMe123!"; // À changer après la première connexion

  try {
    await createUser(name, email, password, "admin");
    console.log("✅ Compte administrateur créé avec succès!");
    console.log(`Email: ${email}`);
    console.log(`Mot de passe: ${password}`);
    console.log("\n⚠️  IMPORTANT: Changez ce mot de passe après la première connexion!\n");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }

  process.exit(0);
}

main();
