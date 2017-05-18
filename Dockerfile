FROM node:alpine

WORKDIR /usr/src/app
RUN apk add --no-cache vim \
    && git clone https://github.com/LLK/scratch-gui.git \
    && mv scratch-gui/* . \
    && rm -rf scratch-gui \
    && npm install

EXPOSE 8601
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
