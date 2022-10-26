FROM node:16.17.1-alpine

COPY package*.json .

# COPY package.json /app
RUN yarn
COPY . .

RUN npm run build

EXPOSE 3000

# Inicializa a aplicação
CMD ["yarn","start"]