# Déploiement Solimouv sur Render

Guide complet pour déployer l'application Solimouv (frontend + backend + PostgreSQL) sur Render.

## 🌐 Application Déployée

**🚀 [Démo live](https://solimouv-txij.onrender.com/)** - Résultat final du déploiement

**URLs déployées** :
- **Frontend** : https://solimouv-txij.onrender.com/
- **API Health** : https://solimouv-backend.onrender.com/health
- **API Base** : https://solimouv-backend.onrender.com/api

## 🚀 Étapes de déploiement

### 1. Préparer le repository

```bash
# S'assurer que tout est commité
git add .
git commit -m "Add PostgreSQL backend with authentication"
git push origin main
```

### 2. Créer les services sur Render

#### A. Base de données PostgreSQL

1. Se connecter à [Render](https://render.com)
2. Créer un nouveau **PostgreSQL** service
3. Configuration :
   - Name: `solimouv-db`
   - Database Name: `solimouv`
   - User: `solimouv` (optionnel)
   - Plan: `Starter` (gratuit)

📝 **Noter l'URL de connexion** générée automatiquement

#### B. Backend API (Web Service)

1. Créer un nouveau **Web Service**
2. Connecter le repository GitHub
3. Configuration :

**Settings**
- Name: `solimouv-backend` 
- Runtime: `Node`
- Root Directory: `backend`
- Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start Command: `npm start`
- Instance Type: `Starter` (gratuit)

**Environment Variables**
```env
NODE_ENV=production
DATABASE_URL=<URL_DE_LA_DB_POSTGRESQL>
JWT_SECRET=<GENERER_AUTOMATIQUEMENT>
FRONTEND_URL=https://solimouv-txij.onrender.com
PORT=3001
```

> 💡 `DATABASE_URL` est fournie automatiquement par Render quand vous liez la DB
> 💡 `JWT_SECRET` peut être générée automatiquement par Render

#### C. Frontend (Static Site)

1. Créer un nouveau **Static Site**
2. Connecter le même repository GitHub  
3. Configuration :

**Settings**
- Name: `solimouv`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Environment Variables**
```env
VITE_API_URL=https://solimouv-backend-txij.onrender.com/api
```

### 3. Ordre de déploiement

1. **PostgreSQL** (en premier)
2. **Backend API** (ensuite - attend la DB)
3. **Frontend** (en dernier - attend le backend)

## 🔧 Configuration avancée

### Variables d'environnement complètes

**Backend (.env production)**
```env
# Base
NODE_ENV=production
PORT=3001

# Base de données (fournie automatiquement)
DATABASE_URL=postgresql://user:pass@host:port/db

# JWT Secret (générer 32+ caractères)
JWT_SECRET=your-super-long-secret-key-here-minimum-32-chars

# CORS
FRONTEND_URL=https://solimouv-txij.onrender.com

# Optionnel
LOG_LEVEL=info
```

**Frontend (.env production)**
```env
VITE_API_URL=https://solimouv-backend-txij.onrender.com/api
VITE_APP_ENV=production
```

### Migrations automatiques

Le backend est configuré pour :
1. Installer les dépendances
2. Générer le client Prisma  
3. Exécuter les migrations automatiquement au déploiement

```bash
# Build command dans Render
npm install && npx prisma generate && npx prisma migrate deploy
```

### Headers et CORS

Le backend configure automatiquement :
- CORS pour le domaine frontend
- Headers de sécurité (Helmet.js)
- Rate limiting
- Validation des données

## 🔍 Vérification du déploiement

### 1. Backend API

Tester les endpoints :
```bash
# Health check
curl https://solimouv-backend-txij.onrender.com/health

# Inscription test
curl -X POST https://solimouv-backend-txij.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"password123","confirmPassword":"password123"}'
```

### 2. Frontend

1. Ouvrir https://solimouv-txij.onrender.com/
2. Tester l'inscription/connexion
3. Vérifier que l'API fonctionne

### 3. Base de données

Se connecter via Render Dashboard > PostgreSQL > Connect pour voir les tables créées.

## ⚡ Optimisations

### Cold Start

Render peut mettre les services gratuits en veille. Pour éviter cela :

1. **Backend** : Configurer un cron job pour faire un ping toutes les 14 minutes
2. **Upgrade** vers un plan payant pour éviter le cold start

### Performance

- Le backend utilise compression gzip
- Le frontend est optimisé par Vite  
- Images optimisées et mise en cache PWA
- Base de données avec index sur les requêtes fréquentes

## 🛠️ Maintenance

### Logs

Accès aux logs via Render Dashboard :
- Backend : Logs en temps réel
- Déploiements : Historique des builds
- Métriques : CPU, RAM, requêtes

### Mises à jour

```bash
# Push pour déclencher un redéploiement
git push origin main
```

Render redéploiera automatiquement :
1. Backend en premier
2. Frontend ensuite

### Backup

La base PostgreSQL est automatiquement sauvegardée par Render.

## 🐛 Troubleshooting

### Erreurs communes

**Build failed**
```bash
# Vérifier les dépendances
npm install
npm run build
```

**Database connection failed**
- Vérifier `DATABASE_URL`
- S'assurer que la DB est créée avant le backend

**CORS errors**
- Vérifier `FRONTEND_URL` dans le backend
- Vérifier `VITE_API_URL=https://solimouv-backend-txij.onrender.com/api` dans le frontend

**JWT errors**  
- Régénérer `JWT_SECRET` (minimum 32 caractères)

### Debug

**Backend logs**
```bash
# Via Render Dashboard > solimouv-backend > Logs
```

**Test API localement**
```bash
cd backend
npm run dev
# Tester sur http://localhost:3001/health
```

**Test frontend localement**
```bash
npm run dev
# Tester sur http://localhost:5173
```

## 📈 Monitoring

### Métriques à surveiller

1. **Réponse API** : < 2s
2. **Uptime** : > 99%
3. **Erreurs** : < 1%
4. **Connexions DB** : < 100

### Alertes

Configurer des alertes Render pour :
- Service down
- Erreurs 5xx
- Usage CPU/RAM élevé

## 🎯 URLs finales

Une fois déployé :

- **Frontend** : https://solimouv-txij.onrender.com/
- **Backend API** : https://solimouv-backend-txij.onrender.com/api
- **Health Check** : https://solimouv-backend-txij.onrender.com/health
- **PostgreSQL** : Géré par Render (pas d'accès public direct)

> 🎆 **Application actuellement déployée et fonctionnelle !**

## 💰 Coût

**Plan gratuit Render** :
- ✅ PostgreSQL : 1 GB
- ✅ Backend : 512 MB RAM
- ✅ Frontend : Bande passante limitée
- ⚠️ Services en veille après 15min d'inactivité

**Plan payant (7$/mois par service)** :
- ✅ Pas de mise en veille
- ✅ Plus de ressources
- ✅ Support prioritaire
