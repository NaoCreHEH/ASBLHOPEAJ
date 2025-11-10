# ASBL Hope Action Jeunesse - Site Web

Site web officiel de l'ASBL Hope Action Jeunesse, une association dédiée à la lutte contre le harcèlement et l'accompagnement des jeunes.

## 🚀 Fonctionnalités

- **Site public** : Pages d'accueil, mission, services, projets, équipe et contact
- **Espace administrateur** : Gestion complète des contenus (services, projets, équipe, messages)
- **Upload d'images** : Conversion automatique en WebP pour optimisation
- **Authentification sécurisée** : JWT avec bcrypt pour les mots de passe
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **SEO optimisé** : Métadonnées configurées pour chaque page

## 📋 Prérequis

- Node.js 18+ (recommandé: 22.x)
- pnpm 8+ (ou npm/yarn)
- Base de données MySQL/TiDB (ou compatible)

## 🛠️ Installation Locale

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd asbl-hope
```

### 2. Installer les dépendances

```bash
pnpm install
# ou
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL=mysql://user:password@localhost:3306/asbl_hope

# JWT Secret (générez une clé aléatoire forte)
JWT_SECRET=votre-secret-jwt-tres-long-et-aleatoire

# Port du serveur (optionnel, défaut: 3000)
PORT=3000

# Node environment
NODE_ENV=development
```

### 4. Initialiser la base de données

```bash
# Créer les tables
pnpm db:push

# Charger les données initiales (services, projets, équipe)
pnpm tsx seed-db.mjs

# Créer un compte administrateur
pnpm tsx init-admin.mjs
```

Le compte admin par défaut :
- **Email** : `admin@asbl-hope.org`
- **Mot de passe** : `ChangeMe123!`

⚠️ **Important** : Changez ce mot de passe après la première connexion !

### 5. Lancer le serveur de développement

```bash
pnpm dev
```

Le site sera accessible sur `http://localhost:3000`

## 📦 Déploiement sur Render

### 1. Préparer la base de données

Créez une base de données MySQL gratuite (par exemple sur PlanetScale, Railway, ou Render PostgreSQL).

### 2. Créer un nouveau Web Service sur Render

1. Connectez votre repository Git
2. Configurez le service :
   - **Build Command** : `pnpm install && pnpm db:push && pnpm build`
   - **Start Command** : `pnpm start`
   - **Environment** : Node

### 3. Variables d'environnement

Ajoutez ces variables dans Render :

```
DATABASE_URL=<votre-url-de-base-de-donnees>
JWT_SECRET=<generer-une-cle-secrete-forte>
NODE_ENV=production
```

### 4. Déployer

1. Cliquez sur "Create Web Service"
2. Attendez la fin du build
3. Votre site sera accessible sur `https://votre-app.onrender.com`

### 5. Initialiser les données

Après le premier déploiement, exécutez les commandes via le shell Render :

```bash
# Charger les données initiales
pnpm tsx seed-db.mjs

# Créer le compte admin
pnpm tsx init-admin.mjs
```

## 🔐 Sécurité

### Génération d'un JWT_SECRET fort

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Bonnes pratiques

- ✅ Changez le mot de passe admin par défaut
- ✅ Utilisez HTTPS en production (automatique sur Render)
- ✅ Gardez vos dépendances à jour
- ✅ Ne commitez jamais le fichier `.env`
- ✅ Utilisez des mots de passe forts (12+ caractères)
- ✅ Activez le rate limiting (déjà configuré)

## 📂 Structure du Projet

```
asbl-hope/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages du site
│   │   └── pages/admin/   # Pages d'administration
├── server/                # Backend Express + tRPC
│   ├── auth.ts           # Logique d'authentification
│   ├── authRoutes.ts     # Routes d'authentification
│   ├── db.ts             # Requêtes base de données
│   ├── routers.ts        # Routes tRPC
│   └── imageUpload.ts    # Gestion des images
├── drizzle/              # Schéma de base de données
│   └── schema.ts
├── seed-db.mjs           # Script de seed
└── init-admin.mjs        # Script création admin
```

## 🎨 Personnalisation

### Couleurs

Les couleurs de la marque sont définies dans `client/src/index.css` :

- **Violet** : `#7B4397`
- **Jaune** : `#F4D03F`
- **Bleu** : `#1E5BA8`
- **Vert** : `#6DBF5A`

### Logo

Modifiez la variable `VITE_APP_LOGO` dans les variables d'environnement.

## 📝 Scripts Disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement

# Build
pnpm build            # Compiler pour la production
pnpm start            # Lancer en production

# Base de données
pnpm db:push          # Appliquer les migrations
pnpm tsx seed-db.mjs  # Charger les données initiales

# Utilitaires
pnpm tsx init-admin.mjs     # Créer un compte admin
pnpm tsx export-db.mjs      # Exporter la base de données
```

## 🆘 Support

Pour toute question ou problème :

- **Email** : contact@asbl-hope.org
- **Site** : https://www.asbl-hope.org

## 📄 Licence

© 2024 ASBL Hope Action Jeunesse. Tous droits réservés.
