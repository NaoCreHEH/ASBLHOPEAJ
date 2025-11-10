# Guide de Déploiement Rapide

## 📦 Contenu du Package

- Code source complet (client + server)
- Scripts de migration et seed
- Configuration TypeScript et build
- Documentation complète

## 🚀 Déploiement sur Render (Recommandé)

### Étape 1 : Préparer la Base de Données

Créez une base de données MySQL gratuite :

**Option A : PlanetScale (Recommandé)**
1. Allez sur https://planetscale.com
2. Créez un compte gratuit
3. Créez une nouvelle base de données
4. Copiez l'URL de connexion

**Option B : Railway**
1. Allez sur https://railway.app
2. Créez un projet MySQL
3. Copiez l'URL de connexion

### Étape 2 : Déployer sur Render

1. **Créer un compte Render**
   - Allez sur https://render.com
   - Créez un compte gratuit

2. **Créer un nouveau Web Service**
   - Cliquez sur "New +" → "Web Service"
   - Connectez votre repository Git
   - Ou uploadez le code via "Deploy from Git"

3. **Configuration du Service**
   ```
   Name: asbl-hope
   Environment: Node
   Build Command: pnpm install && pnpm db:push && pnpm build
   Start Command: pnpm start
   ```

4. **Variables d'Environnement**
   
   Ajoutez ces variables dans l'onglet "Environment" :
   
   ```
   DATABASE_URL=<votre-url-planetscale>
   JWT_SECRET=<générer-avec-commande-ci-dessous>
   NODE_ENV=production
   PORT=10000
   ```

   **Générer un JWT_SECRET fort** :
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Déployer**
   - Cliquez sur "Create Web Service"
   - Attendez la fin du build (~5 minutes)

### Étape 3 : Initialiser les Données

Une fois déployé, ouvrez le Shell Render :

```bash
# Charger les données initiales
pnpm tsx seed-db.mjs

# Créer le compte admin
pnpm tsx init-admin.mjs
```

**Compte admin par défaut** :
- Email: `admin@asbl-hope.org`
- Mot de passe: `ChangeMe123!`

⚠️ Changez ce mot de passe immédiatement après la première connexion !

### Étape 4 : Accéder au Site

Votre site sera accessible sur : `https://asbl-hope.onrender.com`

Pour vous connecter en tant qu'admin :
1. Allez sur `https://asbl-hope.onrender.com/login`
2. Utilisez les identifiants par défaut
3. Changez votre mot de passe

## 🔧 Installation Locale (Développement)

### Prérequis

- Node.js 18+
- pnpm (ou npm)
- MySQL local ou distant

### Installation

```bash
# 1. Extraire le package
tar -xzf asbl-hope-export.tar.gz
cd asbl-hope

# 2. Installer les dépendances
pnpm install

# 3. Configurer l'environnement
cp env.example.txt .env
# Éditez .env avec vos valeurs

# 4. Initialiser la base de données
pnpm db:push
pnpm tsx seed-db.mjs
pnpm tsx init-admin.mjs

# 5. Lancer le serveur
pnpm dev
```

Le site sera sur `http://localhost:3000`

## 🔐 Sécurité en Production

### Checklist de Sécurité

- ✅ Changez le mot de passe admin par défaut
- ✅ Utilisez un JWT_SECRET fort et unique
- ✅ Activez HTTPS (automatique sur Render)
- ✅ Configurez DATABASE_URL avec SSL
- ✅ Ne commitez jamais les fichiers .env
- ✅ Gardez les dépendances à jour

### Générer des Secrets Forts

```bash
# JWT Secret (64 bytes)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Mot de passe fort (16 caractères)
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## 📊 Base de Données

### Structure

- `users` - Comptes utilisateurs (admin)
- `services` - Services proposés par l'ASBL
- `projects` - Projets réalisés
- `teamMembers` - Membres de l'équipe
- `contactMessages` - Messages de contact

### Backup

```bash
# Export des données
pnpm tsx export-db.mjs
# Crée: database-export.json
```

### Restauration

Importez le fichier `database-export.json` manuellement ou créez un script d'import.

## 🆘 Dépannage

### Erreur de connexion à la base de données

Vérifiez que :
- `DATABASE_URL` est correct
- La base de données est accessible
- SSL est activé si nécessaire

### Erreur "Token invalide"

- Vérifiez que `JWT_SECRET` est défini
- Reconnectez-vous

### Build échoue sur Render

- Vérifiez que `pnpm` est bien utilisé
- Consultez les logs de build
- Vérifiez que toutes les dépendances sont dans `package.json`

## 📞 Support

Pour toute question :
- Email: contact@asbl-hope.org
- Documentation: README.md

## 🎉 Prochaines Étapes

Après le déploiement :

1. ✅ Connectez-vous et changez le mot de passe admin
2. ✅ Uploadez le logo de l'ASBL
3. ✅ Ajoutez des images aux services et projets
4. ✅ Personnalisez les contenus
5. ✅ Testez le formulaire de contact
6. ✅ Configurez un nom de domaine personnalisé (optionnel)

Bon déploiement ! 🚀
