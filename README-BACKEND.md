# Solimouv Backend API avec PostgreSQL

Backend API pour l'application Solimouv avec authentification JWT et base de données PostgreSQL.

## 🌐 API Live

**🚀 [API en production](https://solimouv-txij.onrender.com/)** | [Frontend live](https://solimouv-txij.onrender.com/)

- **Base URL** : `https://solimouv-backend.onrender.com/api`
- **Health check** : `https://solimouv-backend.onrender.com/health`

## 🚀 Installation rapide

```bash
# Installer toutes les dépendances (frontend + backend)
npm run setup

# Démarrer en mode développement (frontend + backend)
npm run dev:fullstack
```

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 14+ (local ou distant)
- npm ou yarn

## 🛠️ Configuration

### 1. Base de données PostgreSQL

**Option A : PostgreSQL local**
```bash
# Installer PostgreSQL
# Windows : https://www.postgresql.org/download/windows/
# macOS : brew install postgresql
# Linux : apt install postgresql postgresql-contrib

# Créer une base de données
createdb solimouv
```

**Option B : PostgreSQL cloud (recommandé)**
- [Neon](https://neon.tech) (gratuit)
- [Supabase](https://supabase.com) (gratuit)  
- [Railway](https://railway.app) (gratuit)

### 2. Configuration des variables d'environnement

Créer `backend/.env` :

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/solimouv"

# JWT Secret (générer une clé sécurisée)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Configuration serveur
PORT=3001
NODE_ENV=development

# Frontend URL pour CORS
FRONTEND_URL="http://localhost:5173"
```

### 3. Initialisation de la base de données

```bash
cd backend

# Générer le client Prisma
npm run db:generate

# Créer/synchroniser le schéma
npm run db:push

# Optionnel : Ouvrir Prisma Studio
npm run db:studio
```

## 🏃‍♂️ Développement

### Démarrer le backend seul
```bash
cd backend
npm run dev
```

### Démarrer frontend + backend
```bash
npm run dev:fullstack
```

### API Endpoints

**Authentification**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion  
- `GET /api/auth/verify` - Vérifier le token
- `POST /api/auth/logout` - Déconnexion

**Utilisateurs**
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mettre à jour le profil
- `PUT /api/users/password` - Changer le mot de passe
- `GET /api/users/:username` - Profil public

**Posts** (exemple pour contenu)
- `GET /api/posts` - Liste des posts
- `POST /api/posts` - Créer un post
- `GET /api/posts/:id` - Détails d'un post
- `PUT /api/posts/:id` - Modifier un post
- `DELETE /api/posts/:id` - Supprimer un post

## 📱 Frontend Integration

L'authentification est intégrée dans le frontend Svelte via :

- `src/utils/authStore.js` - Service d'authentification
- `src/components/AuthModal.svelte` - Modal de connexion/inscription
- `src/components/Header.svelte` - Boutons auth + menu profil

**Utilisation dans Svelte**
```js
import { authService, isAuthenticated, currentUser } from './utils/authStore.js';

// Connexion
const result = await authService.login(email, password);

// État réactif
$isAuthenticated // true/false
$currentUser     // données utilisateur
```

## 🚀 Déploiement sur Render

### 1. Préparation

1. Pusher le code sur GitHub
2. Connecter le repo à Render
3. Créer une base PostgreSQL sur Render

### 2. Configuration Render

**Backend (Web Service)** - [`solimouv-backend`](https://dashboard.render.com)
- Runtime: Node  
- Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start Command: `npm start`
- Instance Type: `Starter` (gratuit)
- Environment Variables:
  - `DATABASE_URL` (fourni par Render PostgreSQL)
  - `JWT_SECRET` (générer automatiquement)
  - `NODE_ENV=production`
  - `FRONTEND_URL=https://solimouv-txij.onrender.com`

**Frontend (Static Site)** - [`solimouv`](https://dashboard.render.com)
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables:
  - `VITE_API_URL=https://solimouv-backend.onrender.com/api`

### 3. Base de données PostgreSQL

Render créera automatiquement :
- Une instance PostgreSQL
- `DATABASE_URL` dans les variables d'environnement
- Backups automatiques

## 🔧 Scripts disponibles

**Frontend**
```bash
npm run dev          # Démarrage développement
npm run build        # Build production
npm run preview      # Preview du build
```

**Backend**
```bash
npm run backend:dev      # Démarrage développement
npm run backend:start    # Démarrage production
npm run backend:build    # Build + migration DB
```

**Fullstack**
```bash
npm run setup           # Installation complète
npm run dev:fullstack   # Dev frontend + backend
```

## 🏗️ Architecture

```
solimouv/
├── src/                    # Frontend Svelte
│   ├── components/
│   │   ├── AuthModal.svelte
│   │   └── Header.svelte
│   ├── utils/
│   │   └── authStore.js
│   └── ...
├── backend/                # Backend API
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── package.json           # Scripts racine
└── README-BACKEND.md      # Cette documentation
```

## 🔒 Sécurité

- JWT avec expiration 7 jours
- Hachage bcrypt (12 rounds)
- Validation Joi sur toutes les entrées
- Rate limiting (100 req/15min)
- Helmet.js pour les headers sécurisés
- CORS configuré

## 🐛 Débogage

**URLs de test en production** :
- API Health : https://solimouv-backend.onrender.com/health
- Frontend : https://solimouv-txij.onrender.com/

**Erreurs courantes**

1. **Connexion DB échoue**
   ```bash
   # Vérifier la DATABASE_URL
   npx prisma db push
   ```

2. **CORS errors**
   ```bash
   # Vérifier FRONTEND_URL dans .env
   ```

3. **JWT errors**
   ```bash
   # Régénérer JWT_SECRET (32+ caractères)
   ```

4. **Cold start lent (gratuit Render)**
   - Premier accès après 15min d'inactivité : ~30 secondes
   - Solution : upgrade vers plan payant ou keep-alive service

**Logs utiles**
```bash
# Logs backend
cd backend && npm run dev

# Prisma Studio
cd backend && npm run db:studio
```

## 📧 Support

Pour les problèmes spécifiques au backend :
1. Vérifier les logs serveur
2. Tester les endpoints avec Postman/Thunder Client
3. Consulter Prisma Studio pour les données
