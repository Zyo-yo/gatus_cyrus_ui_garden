FROM node:24-alpine AS build

WORKDIR /gatus_cyrus_ui_garden

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /gatus_cyrus_ui_garden

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /gatus_cyrus_ui_garden/build ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
