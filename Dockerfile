FROM node:alpine

WORKDIR /usr/src/app
RUN apk add --no-cache git vim \
    && git clone https://github.com/LLK/scratch-gui.git \
    && mv scratch-gui/* . \
    && rm -rf scratch-gui \
    && npm install \
    && sed -ri -e "s!8601!80!g" ./webpack.config.js

EXPOSE 80
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
