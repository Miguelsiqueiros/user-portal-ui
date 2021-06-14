# Generate static
FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
COPY dest/dist/user-portal-app /app

# Stage 2
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY /dist/user-portal-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx