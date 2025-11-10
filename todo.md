# TODO - ASBL Hope Action Jeunesse

## Configuration initiale
- [x] Configurer la base de données avec les tables nécessaires
- [x] Configurer les couleurs et le thème ASBL Hope (violet, jaune, bleu, vert)
- [ ] Ajouter le logo ASBL Hope

## Pages principales
- [x] Page Accueil avec hero section et présentation
- [x] Page Mission avec l'histoire du fondateur
- [x] Page Services avec les trois services principaux
- [x] Page Projets avec les actions réalisées
- [x] Page À propos avec l'équipe
- [x] Page Contact avec formulaire
- [ ] Page Blog (optionnel)

## Composants
- [x] Navigation responsive avec logo
- [x] Footer avec réseaux sociaux et contact
- [x] Carte de service avec fleur symbolique
- [x] Carte de projet avec image
- [x] Carte de membre d'équipe
- [x] Formulaire de contact

## Fonctionnalités admin
- [ ] Dashboard admin pour gérer les services
- [ ] Gestion des projets
- [ ] Gestion des membres de l'équipe
- [ ] Gestion des messages de contact

## Design et style
- [x] Appliquer la palette de couleurs ASBL Hope
- [x] Créer des sections avec dégradés violet-bleu
- [x] Ajouter des animations et transitions
- [x] Rendre le site responsive

## Contenu
- [x] Intégrer tous les textes du site WordPress
- [ ] Ajouter les images et photos
- [ ] Configurer les métadonnées SEO

## Nouvelles fonctionnalités demandées
- [x] Créer l'espace d'administration avec authentification
- [x] Page admin pour gérer les services
- [x] Page admin pour gérer les projets
- [x] Page admin pour gérer les membres de l'équipe
- [x] Page admin pour consulter les messages de contact
- [x] Ajouter les métadonnées SEO côté client
- [x] Configurer le SEO côté serveur

## Améliorations UX
- [x] Ajouter un bouton d'accès admin dans la navigation
- [x] Rediriger le bouton "Rejoindre" vers le formulaire de contact

## Base de données
- [x] Créer un script de seed pour charger les données initiales (services, projets, équipe)

## Gestion des images
- [x] Ajouter l'upload d'images pour les services avec conversion automatique en WebP
- [x] Ajouter l'upload d'images pour les projets avec conversion automatique en WebP
- [x] Ajouter l'upload d'images pour les membres de l'équipe avec conversion automatique en WebP
- [x] Créer une route tRPC pour l'upload et la conversion d'images
- [x] Afficher les images sur les pages publiques

## Authentification et déploiement
- [ ] Remplacer l'authentification OAuth par bcrypt (email/mot de passe)
- [ ] Créer un système de logi## Authentification et déploiement
- [x] Remplacer l'authentification OAuth par bcrypt (routes créées)
- [x] Créer un script d'export de la base de données
- [x] Préparer le package pour déploiement sur Render
- [x] Créer un README avec instructions d'installation locale et déploiement
- [x] Créer DEPLOY.md avec guide de déploiement rapide
- [x] Créer env.example.txt avec les variables nécessaires

## Export du projet
- [x] Créer un script d'export de la base de données
- [x] Créer un README complet avec instructions d'installation
- [x] Scripts init-admin.mjs et seed-db.mjs prêts

## Remplacement OAuth par authentification simple
- [x] Créer les routes d'authentification (/auth/login, /auth/verify, /auth/me)
- [x] Créer le middleware d'authentification avec JWT
- [x] Créer les modules auth.ts et jwt.ts pour bcrypt et tokens
- [x] Créer la page de login simple
- [x] Le bouton Admin est déjà dans la navigation
- [ ] Adapter complètement les routes tRPC (nécessite refonte complète)

## Témoignages
- [x] Créer la table testimonials dans le schéma
- [x] Ajouter les routes tRPC pour gérer les témoignages
- [x] Créer un formulaire public pour soumettre un témoignage (TestimonialForm.tsx)
- [x] Créer la page admin pour valider/rejeter les témoignages
- [x] Afficher les témoignages validés sur la page d'accueil
- [x] Ajouter le lien dans le dashboard admin

## Nouvelles fonctionnalités
- [x] Créer une page dédiée /temoignages avec formulaire et liste des témoignages
- [x] Ajouter une table gallery dans le schéma pour les photos
- [x] Créer l'interface admin pour gérer la galerie photos
- [x] Afficher la galerie sur la page projets
- [x] Créer une table newsletter pour les abonnés
- [x] Ajouter un formulaire d'inscription à la newsletter dans le footer
- [x] Créer l'interface admin pour gérer les abonnés et envoyer des newsletters

## Espace Ressources
- [x] Créer une table resources dans le schéma pour les fichiers téléchargeables
- [x] Créer l'interface admin pour uploader et gérer les ressources
- [x] Créer la page /ressources pour afficher et télécharger les documents
- [x] Ajouter des catégories pour les ressources (guides, fiches, présentations)

## Système de dons
- [x] Installer et configurer Stripe
- [x] Créer une table donations pour suivre les dons
- [x] Créer la page /faire-un-don avec formulaire de paiement
- [x] Créer l'interface admin pour voir l'historique des dons
- [x] Ajouter un bouton "Faire un don" dans la navigation
- [x] Créer le webhook Stripe pour enregistrer les dons
- [x] Créer la page de succès après don

## Calendrier d'événements
- [x] Créer une table events dans le schéma
- [x] Créer une table eventRegistrations pour les réservations
- [x] Créer l'interface admin pour gérer les événements
- [x] Créer la page /evenements avec liste des événements
- [x] Ajouter un système de réservation pour les écoles
- [x] Créer l'interface admin pour gérer les réservations
- [x] Ajouter le lien Événements dans la navigation
