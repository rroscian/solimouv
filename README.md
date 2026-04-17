# Solimouv' - PWA Festival du Sport pour Tous

> **Une Progressive Web App inclusive avec backend complet pour promouvoir et piloter le festival Solimouv', organisé par l'association Up Sport! Paris**

## 🌐 Démo Live

**🚀 [Voir l'application en ligne](https://solimouv-txij.onrender.com/)**

![Solimouv](https://img.shields.io/badge/Solimouv'-Sport%20pour%20Tous-green)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7)

## 🌟 À Propos du Projet

Solimouv' est le festival du sport inclusif qui rassemble toutes les communautés autour de valeurs de **mixité**, **solidarité**, **citoyenneté** et **bienveillance**. Cette PWA a été conçue pour :

- **Faire connaître** le festival et ses valeurs d'inclusion
- **Engager** les publics avec des outils interactifs
- **Piloter** l'événement avec des fonctionnalités de gestion
- **Matcher** les participants avec les sports adaptés à leur profil
- **Pérenniser** l'outil d'une édition à l'autre

## 🎯 Fonctionnalités Principales

### 📱 Progressive Web App Complète
- ✅ **Installable** sur mobile et desktop
- ✅ **Offline** - Fonctionne sans connexion internet
- ✅ **Responsive** - Optimisée mobile-first
- ✅ **Performance** - Chargement rapide, bundle optimisé
- ✅ **Accessible** - Conforme aux standards d'accessibilité

### 🔐 Authentification & Comptes Utilisateur
- 🔒 **Inscription/Connexion** - System JWT sécurisé
- 👤 **Profils personnalisés** - Avatar, bio, préférences
- 🔑 **Gestion de session** - Tokens auto-renouvelés
- 🛡️ **Sécurité renforcée** - Hachage bcrypt, rate limiting
- 📱 **Interface moderne** - Modal responsive et intuitive

### 🏃‍♀️ Assistant de Matching Sportif (Powered by Rust)
- 🦀 **Module Rust/WASM** pour des calculs de compatibilité optimisés
- 🔄 **Fallback JavaScript** si WASM indisponible
- 🎯 **Algorithme intelligent** basé sur le profil utilisateur :
  - Âge et niveau de mobilité
  - Expérience sportive
  - Centres d'intérêt
  - Besoins d'accessibilité
  - Préférences sociales

### 📄 Pages & Navigation
1. **🏠 Accueil** - Présentation du festival et call-to-action
2. **ℹ️ À Propos** - Up Sport!, Solimouv', valeurs et impact
3. **📅 Programme** - Activités, ateliers, assistant de matching
4. **🤝 Partenaires** - Associations, témoignages, candidature
5. **📞 Contact** - Formulaire, FAQ, infos pratiques

### 🔍 SEO & Référencement Optimisé
- 📊 **Balises meta** complètes (Open Graph, Twitter Card)
- 🏗️ **Structure HTML sémantique** (H1-H6, sections, nav)
- 🗺️ **Sitemap.xml** et robots.txt
- 📈 **Données structurées** Schema.org (Event, Organization)
- ⚡ **Performance** optimisée (images, lazy loading)

## 🛠️ Stack Technique

### Frontend
```
Framework:   Svelte 5 + Vite
PWA:         vite-plugin-pwa + Workbox
Performance: Module Rust/WASM + Fallback JS
Styling:     CSS pur (responsive, animations)
SEO:         Meta tags + Structured data
Icons:       @tabler/icons-svelte
Auth:        Service stores réactifs
```

### Backend
```
Runtime:     Node.js + Express.js
Base de données: PostgreSQL + Prisma ORM
Authentification: JWT + bcrypt
Sécurité:    Helmet.js, CORS, rate limiting
Validation:  Joi schemas
API:         RESTful endpoints
```

### Déploiement
```
Platform:    Render.com
Database:    PostgreSQL managed
Frontend:    Static site deployment
Backend:     Web service deployment
Domaine:     solimouv-txij.onrender.com
```

## 🚀 Installation & Lancement

### Option 1 : Script Automatisé (Recommandé)

**Windows PowerShell :**
```powershell
.\setup.ps1
```

**Windows Command Prompt :**
```cmd
setup.bat
```

### Option 2 : Installation Manuelle

```bash
# Installation des dépendances
npm install

# (Optionnel) Compilation du module Rust WASM
cd rust-wasm
wasm-pack build --target web
cd ..

# Lancement en développement
npm run dev

# Build pour production
npm run build
npm run preview
```

### 🌐 Accès
- **Production**: https://solimouv-txij.onrender.com/
- **Développement Frontend**: http://localhost:5173
- **Développement Backend**: http://localhost:3001
- **Preview**: http://localhost:4173 (après build)

## 📁 Structure du Projet

```
solimouv/
├── 📄 README.md                    # Documentation principale
├── 📄 README-BACKEND.md            # Documentation API
├── 🔧 package.json                 # Scripts racine + dépendances
├── ⚙️ vite.config.js              # Configuration Vite + PWA
├── 🗂️ public/                     # Assets statiques
│   ├── 🗺️ sitemap.xml             # Plan du site pour SEO
│   ├── 🤖 robots.txt              # Instructions robots d'indexation
│   └── 🎨 pwa-*.png               # Icônes PWA
├── 📦 src/                        # Frontend Svelte
│   ├── 🎯 main.js                 # Point d'entrée + PWA
│   ├── 📱 App.svelte              # Composant racine + Router
│   ├── 🧩 components/             # Composants réutilisables
│   │   ├── Header.svelte          # Navigation + Auth
│   │   ├── Footer.svelte          # Pied de page
│   │   ├── AuthModal.svelte       # Modal connexion/inscription
│   │   └── SportMatcher.svelte    # Assistant de matching
│   ├── 📄 screens/                # Pages principales
│   │   ├── Home.svelte            # Accueil
│   │   ├── About.svelte           # À propos
│   │   ├── Program.svelte         # Programme + Matcher
│   │   ├── Partners.svelte        # Partenaires
│   │   └── Contact.svelte         # Contact + FAQ
│   └── 🔧 utils/                  # Utilitaires
│       ├── authStore.js           # Service d'authentification
│       ├── pwaStore.js            # Gestion PWA
│       └── rustMatcher.js         # Interface Rust/WASM
├── 🔙 backend/                     # API Backend
│   ├── 🗃️ prisma/                 # Base de données
│   │   └── schema.prisma          # Modèles User, Post, Comment
│   ├── 🛤️ routes/                 # Routes API
│   │   ├── auth.js                # Authentification JWT
│   │   ├── users.js               # Gestion utilisateurs
│   │   └── posts.js               # Contenu et interactions
│   ├── 🛡️ middleware/             # Middlewares
│   │   └── auth.js                # Protection routes
│   ├── 📄 .env.example            # Template configuration
│   ├── 🔧 package.json            # Dépendances backend
│   └── 🚀 index.js                # Serveur Express
├── 🦀 rust-wasm/                  # Module Rust WASM
│   ├── Cargo.toml                 # Configuration Rust
│   └── src/lib.rs                 # Algorithme de matching
├── 📝 setup-dev.md                # Guide développement
├── � render-deploy.md            # Guide déploiement Render
├── �🔨 setup.ps1                   # Script setup PowerShell
└── 📝 setup.bat                   # Script setup Batch
```

## 🎨 Charte Graphique & Design

### 🎨 Palette de Couleurs
```css
Vert Principal:    #2E7D32  /* Logo, titres, CTA */
Vert Secondaire:   #4CAF50  /* Boutons, accents */
Vert Clair:        #A5D6A7  /* Liens, sous-titres */
Arrière-plans:     #E8F5E8, #F1F8E9  /* Sections */
Neutre:           #333, #666, #f8f9fa  /* Textes */
```

### 📝 Typographie
- **Système**: `system-ui, -apple-system, 'Segoe UI', sans-serif`
- **Hiérarchie**: H1 (3rem) → H2 (2.5rem) → H3 (1.5rem)
- **Corps**: 1rem (ligne: 1.6)

### 🎭 Iconographie
- **Émojis** pour les accents visuels (🏃‍♀️, 🤝, 🎯, ❤️)
- **@tabler/icons-svelte** pour l'interface

## ♿ Accessibilité & Inclusion

- ✅ **Contrastes** respectant WCAG 2.1
- ✅ **Navigation clavier** complète
- ✅ **Tailles de texte** adaptatives
- ✅ **Structure sémantique** HTML5
- ✅ **Compatibilité** lecteurs d'écran
- ✅ **Responsive** mobile-first

## 📈 Performance & SEO

### 🚀 Optimisations Performance
- Bundle optimisé (~45KB gzippé)
- Lazy loading des images
- Service Worker pour cache offline
- Code splitting automatique

### 🔍 SEO Intégré
- Meta tags complets
- Structured Data (Event, Organization)
- Sitemap.xml automatique
- URLs propres et descriptives
- Images optimisées

## 🦀 Module Rust WASM

### 🎯 Fonctionnalités
Le module `SportMatcher` en Rust offre :

```rust
pub struct SportMatcher {
    // Calcul optimisé de compatibilité sport/utilisateur
    // Score basé sur 6 critères : âge, mobilité, expérience,
    // intérêts, accessibilité, préférences sociales
}
```

### 🔄 Fallback JavaScript
Si WASM indisponible, fallback automatique transparent avec la même API.

### 📊 Algorithme de Matching
```
Score = Âge(25pts) + Mobilité(30pts) + Expérience(20pts) 
      + Intérêts(15pts) + Accessibilité(25pts) + Social(15pts)
```

## 🌍 Impact Social & Valeurs

### 📊 Métriques d'Impact (Édition 2025)
- **500+** participants de tous horizons
- **92%** souhaitent revenir l'année prochaine  
- **85%** ont découvert de nouvelles activités
- **78%** renforcés dans leur sentiment d'inclusion

### 🎯 Publics Ciblés
- Familles avec enfants
- Jeunes et adolescents  
- Seniors actifs
- Personnes en situation de handicap
- Débutants en sport
- Communauté LGBTQIA+
- Personnes réfugiées

## 🤝 Associations Partenaires

13+ associations engagées dans l'inclusion :
- **Up Sport!** (organisateur principal)
- **Handi Club Paris** (sport adapté)
- **Boxing Solidaire** (boxe éducative)
- **Yoga Pour Tous** (bien-être inclusif)
- **Urban Dance Collective** (danse urbaine)
- Et bien d'autres...

## 🚢 Déploiement & Production

### 📦 Build de Production
```bash
npm run build    # Génère dist/ optimisé
npm run preview  # Test du build en local
```

### 🌐 Déploiement
**Production actuelle** :
- 🚀 [Application live](https://solimouv-txij.onrender.com/) - Render.com
- 🗃️ PostgreSQL database managée
- ⚡ API backend + frontend static

**Alternatives supportées** :
- Netlify, Vercel (frontend statique uniquement)
- Railway, Supabase (backend + DB)
- VPS avec Docker (déploiement complet)

### 📊 Monitoring Recommandé
- Google Analytics pour l'usage
- Lighthouse CI pour la performance
- Sentry pour les erreurs

## 📞 Support & Contact

### 🏢 Organisation
**Up Sport!** - Association sportive parisienne  
📧 contact@unispourlesport.paris  
🌐 https://www.unispourlesport.paris/

### 📱 Réseaux Sociaux
- Instagram: [@solimouv.festival](https://instagram.com/solimouv.festival)
- Instagram: [@unispourlesport](https://instagram.com/unispourlesport)  
- Facebook: [UpSport.UNis](https://facebook.com/UpSport.UNis)

### 🐛 Issues & Contributions
Ce projet a été développé lors du Hackathon 2025 pour l'association Up Sport!

## 📄 Licence

Ce projet est développé pour l'association **Up Sport!** dans le cadre de la promotion du festival Solimouv'. 

**Mission** : Rendre le sport accessible à toutes et tous 🏃‍♀️🤝

---

*"Sport pour tous, sport ensemble" - Solimouv' 2025*
