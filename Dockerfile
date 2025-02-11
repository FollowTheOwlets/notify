FROM node:22-alpine

ENV APP_ROOT=/usr/src/app
WORKDIR $APP_ROOT

EXPOSE 8080
ENTRYPOINT ["npm", "run"]
