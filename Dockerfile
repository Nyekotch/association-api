# Image Node officielle
FROM node:18-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Compiler NestJS
RUN npm run build

# Exposer le port Nest
EXPOSE 3000

# Lancer l'app
CMD ["node", "dist/main.js"]
