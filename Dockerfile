FROM node:24-alpine AS build

WORKDIR /gatus_cyrus_ui_garden_build_checks

ENV HUSKY=0
ENV CI=true

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run check
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /gatus_cyrus_ui_garden_build_checks

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /gatus_cyrus_ui_garden_build_checks/build ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
