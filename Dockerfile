FROM node:alpine

ENV NODE_ENV production

RUN apk add --no-cache git \
    && npm install -g webpack-dev-server \
    && git clone https://github.com/LLK/scratch-gui \
    && cd scratch-gui \
    && npm install && npm audit fix --force \
    && sed -ri -e "s/8601/80,\n\tdisableHostCheck: true/" ./webpack.config.js

WORKDIR /scratch-gui
EXPOSE 80
CMD ["npm","start"]
