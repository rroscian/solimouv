# Configuration développement Solimouv

Guide de démarrage rapide pour le développement local avec PostgreSQL et authentification.

## 🚀 Démarrage ultra-rapide

```bash
# 1. Installation
npm run setup

# 2. Configuration base de données
# Copier backend/.env.example vers backend/.env
# Modifier DATABASE_URL avec vos credentials PostgreSQL

# 3. Initialisation DB
cd backend
npm run db:push

# 4. Démarrage fullstack
npm run dev:fullstack
```

## 📋 Étapes détaillées

### 1. Installation des dépendances

```bash
# Installer frontend + backend
npm run setup
# Ou manuellement :
# npm install && cd backend && npm install
```

### 2. Base de données PostgreSQL

**Option A : PostgreSQL local**
```bash
# Windows (avec chocolatey)
choco install postgresql

# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian  
sudo apt install postgresql postgresql-contrib
```

**Option B : PostgreSQL cloud (gratuit)**
- [Neon](https://neon.tech) ⭐ Recommandé
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### 3. Configuration environnement

**Créer `backend/.env`** :
```env
# Copier depuis backend/.env.example et modifier :

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/solimouv"

# JWT Secret (générer une clé longue)
JWT_SECRET="mon-super-secret-jwt-de-32-caracteres-minimum"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL pour CORS
FRONTEND_URL="http://localhost:5173"
```

### 4. Initialiser la base de données

```bash
cd backend

# Générer le client Prisma
npm run db:generate

# Créer les tables  
npm run db:push

# Optionnel : Explorer avec Prisma Studio
npm run db:studio
# Ouvrir http://localhost:5555
```

### 5. Démarrage des serveurs

**Option A : Tout en un**
```bash
npm run dev:fullstack
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

**Option B : Séparé**
```bash
# Terminal 1 : Backend
cd backend && npm run dev

# Terminal 2 : Frontend
npm run dev
```

## 🧪 Tests de fonctionnement

### 1. API Backend

```bash
# Health check
curl http://localhost:3001/health

# Test inscription
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "username": "testuser", 
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 2. Frontend

1. Ouvrir http://localhost:5173
2. Cliquer sur "Inscription" dans le header
3. Créer un compte de test
4. Vérifier la connexion automatique

### 3. Base de données

```bash
cd backend && npm run db:studio
# Vérifier que les utilisateurs sont créés
```

## 📁 Structure du projet

```
solimouv/
├── src/                           # Frontend Svelte
│   ├── components/
│   │   ├── AuthModal.svelte       # Modal connexion/inscription
│   │   └── Header.svelte          # Navigation avec auth
│   ├── utils/
│   │   └── authStore.js           # Service d'authentification
│   └── screens/                   # Pages de l'app
├── backend/                       # API Backend
│   ├── prisma/
│   │   └── schema.prisma          # Schéma base de données
│   ├── routes/
│   │   ├── auth.js                # Routes authentification
│   │   ├── users.js               # Routes utilisateurs  
│   │   └── posts.js               # Routes contenu
│   ├── middleware/
│   │   └── auth.js                # Middleware JWT
│   ├── .env.example               # Template config
│   └── index.js                   # Serveur principal
├── package.json                   # Scripts racine
└── README-BACKEND.md              # Documentation complète
```

## 🔧 Scripts disponibles

```bash
# Installation
npm run setup                 # Frontend + Backend
npm run backend:install       # Backend uniquement

# Développement
npm run dev                   # Frontend seul
npm run backend:dev           # Backend seul  
npm run dev:fullstack         # Frontend + Backend

# Base de données
cd backend
npm run db:generate           # Générer client Prisma
npm run db:push              # Synchroniser schéma
npm run db:studio            # Interface graphique
npm run db:migrate           # Créer migration

# Production
npm run build                # Build frontend
npm run backend:start        # Démarrer backend prod
```

## 🎯 URLs de développement

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001  
- **Health check** : http://localhost:3001/health
- **Prisma Studio** : http://localhost:5555

## 🔍 Debug et troubleshooting

### Problèmes courants

**1. Erreur de connexion DB**
```bash
# Vérifier que PostgreSQL fonctionne
pg_isready -U postgres

# Tester la connection string
cd backend && npx prisma db push
```

**2. CORS errors dans le navigateur**
```bash
# Vérifier FRONTEND_URL dans backend/.env
FRONTEND_URL="http://localhost:5173"
```

**3. JWT errors**
```bash
# Générer un nouveau JWT_SECRET long (32+ caractères)
# Dans backend/.env
JWT_SECRET="votre-tres-long-secret-jwt-ici-minimum-32-caracteres"
```

**4. Port déjà utilisé**
```bash
# Trouver le processus utilisant le port 3001
netstat -ano | findstr :3001   # Windows
lsof -i :3001                  # macOS/Linux

# Tuer le processus ou changer le PORT dans .env
```

### Logs utiles

```bash
# Logs backend avec détails
cd backend && DEBUG=* npm run dev

# Logs Prisma
cd backend && npx prisma db push --debug

# Console navigateur
# F12 → Console pour voir les erreurs frontend
```

## 🚀 Prêt pour le déploiement

Une fois que tout fonctionne localement :

1. **Commit les changements**
   ```bash
   git add .
   git commit -m "Add PostgreSQL backend with authentication"
   git push origin main
   ```

2. **Déployer sur Render**
   - Suivre le guide `render-deploy.md`
   - Créer PostgreSQL → Backend → Frontend dans cet ordre

3. **Tester en production**
   - Vérifier l'authentification
   - Tester la synchronisation des données

## 💡 Conseils de développement

- **Prisma Studio** pour visualiser/modifier les données facilement
- **Thunder Client** (VS Code) pour tester l'API  
- **Git** : Commiter souvent, surtout avant les modifications de DB
- **Logs** : Surveiller la console backend pour les erreurs
- **.env** : Ne jamais commiter les fichiers .env avec des vraies credentials

## 🔒 Sécurité en développement

- JWT secret aléatoire et long
- Base de données séparée du production  
- CORS configuré uniquement pour localhost
- Rate limiting désactivé en dev pour les tests
