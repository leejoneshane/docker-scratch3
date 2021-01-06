FROM node:alpine

ENV NODE_ENV production
WORKDIR /scratch-gui

RUN apk add --no-cache python eudev-dev linux-headers build-base git \
    && git clone https://github.com/LLK/scratch-gui \
    && cd scratch-gui \
    && npm install && npm audit fix --force \
    && sed -ri -e "s/8601/80,\n\tdisableHostCheck: true/" ./webpack.config.js

WORKDIR /usr/src/app/scratch-gui
EXPOSE 80
CMD ["npm","start"]
