# Angular Application
FROM node:18.10-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:latest AS ngi
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist/src/app/dist/front /usr/share/nginx/html

COPY replace_api_url.sh /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/replace_api_url.sh
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/replace_api_url.sh && nginx -g 'daemon off;'"]

EXPOSE 80
