FROM node:alpine

RUN apk add --no-cache git vim \
    && mkdir -p /usr/src/app \
    && cd /usr/src/app \
    && git clone https://github.com/LLK/scratch-gui.git \
    && cd scratch-gui \
    && npm install \
    && sed -ri -e "s!8601!80!g" ./webpack.config.js

WORKDIR /usr/src/app/scratch
EXPOSE 80
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
