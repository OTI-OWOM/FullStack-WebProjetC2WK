# Node server
FROM node:16-alpine as node-server

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /home/app
COPY . /home/app
RUN npm install

EXPOSE 3000

CMD ["node", "/home/app/server.js"]

# Angular Application
FROM node:18.10-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/front /usr/share/nginx/html
EXPOSE 80
