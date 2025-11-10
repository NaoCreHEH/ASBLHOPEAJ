import { createUser } from "./server/auth.ts";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("=== Création d'un compte administrateur ===\n");

  const name = await question("Nom complet: ");
  const email = await question("Email: ");
  const password = await question("Mot de passe: ");

  try {
    await createUser(name, email, password, "admin");
    console.log("\n✅ Compte administrateur créé avec succès!");
    console.log(`Email: ${email}`);
  } catch (error) {
    console.error("\n❌ Erreur:", error.message);
  }

  rl.close();
  process.exit(0);
}

main();
