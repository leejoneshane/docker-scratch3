FROM node:alpine

WORKDIR /usr/src/app
RUN apk add --no-cache git vim \
    && git clone https://github.com/LLK/scratch-gui.git \
    && mv scratch-gui/* . \
    && rm -rf scratch-gui \
    && npm install

ADD webpack.config.js /usr/src/app/
EXPOSE 80
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
