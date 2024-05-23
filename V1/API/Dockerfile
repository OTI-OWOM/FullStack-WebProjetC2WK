# Node server
FROM node:16-alpine as node-server

WORKDIR /home/app
COPY . /home/app
RUN npm install

EXPOSE 3000

CMD ["node", "/home/app/server.js"]