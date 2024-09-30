FROM node:18-alpine

ARG APP_NAME

ENV APP_NAME ${APP_NAME}

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build ${APP_NAME}

CMD npm run start:prod:${APP_NAME}
