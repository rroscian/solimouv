# Multi-stage build pour optimiser l'image
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration npm
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Générer le client Prisma
RUN npx prisma generate

# Stage final
FROM node:18-alpine

# Installer dumb-init pour la gestion des signaux
RUN apk add --no-cache dumb-init

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers depuis le builder
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules
COPY --chown=backend:nodejs . .

# Exposer le port
EXPOSE 3001

# Changer vers l'utilisateur non-root
USER backend

# Commande de démarrage avec dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
