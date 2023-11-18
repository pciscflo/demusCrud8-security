#Primera Etapa
FROM node:18-alpine as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/demus-crud /usr/share/nginx/html

