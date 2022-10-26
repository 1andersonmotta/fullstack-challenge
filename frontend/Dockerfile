FROM node:16.17.0-alpine

COPY package*.json .

# COPY package.json /app
RUN npm install

COPY . .

EXPOSE 3000

# Inicializa a aplicação
CMD ["npm", "run","dev"]