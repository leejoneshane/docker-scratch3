FROM node:alpine

ENV NODE_ENV production
COPY scratch-gui /usr/src/app/scratch-gui

RUN apk add --no-cache git bash
#    && cd /usr/src/app \
#    && git clone https://github.com/LLK/scratch-gui \
#    && cd scratch-gui \
#    && npm install \
#    && sed -ri -e "s/8601/80,\n disableHostCheck: true/" ./webpack.config.js

WORKDIR /usr/src/app/scratch-gui
EXPOSE 80
CMD ["npm","start"]
