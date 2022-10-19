FROM node:16.17.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run prebuild
RUN npm run build

CMD ["yarn", "start"]