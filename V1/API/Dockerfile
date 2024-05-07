# Node server
FROM node:16-alpine as node-server

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /home/app
COPY . /home/app
RUN npm install

EXPOSE 3000

CMD ["node", "/home/app/server.js"]