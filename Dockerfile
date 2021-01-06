FROM node:8-alpine

ENV NODE_ENV production
#COPY scratch-gui /usr/src/app/scratch-gui

RUN apk add --no-cache git bash \
    && npm install -g @angular/cli@latest \
    && npm install -g mkdirp \
    && mkdir -p /usr/src/app \
    && cd /usr/src/app \
    && git clone https://github.com/LLK/scratch-gui \
    && cd scratch-gui \
    && rm -rf .git \
    && npm install && npm run build \
    && sed -ri -e "s/8601/80,\n\tdisableHostCheck: true/" ./webpack.config.js

WORKDIR /usr/src/app/scratch-gui
EXPOSE 80
CMD ["npm","start"]
