FROM node:alpine

RUN apk add --no-cache git vim \
    && mkdir -p /usr/src/app \
    && cd /usr/src/app \
    && git clone https://github.com/LLK/scratch-gui.git \
    && cd scratch-gui \
    && npm install

WORKDIR /usr/src/app/scratch-gui
EXPOSE 8601
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
