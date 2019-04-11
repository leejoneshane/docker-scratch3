FROM node:alpine

ENV NODE_ENV production
COPY scratch-gui /usr/src/app/scratch-gui

RUN cd /usr/src/app/scratch-gui \
#    && npm install \
    && sed -ri -e "s/8601/80,\n disableHostCheck: true/" ./webpack.config.js

WORKDIR /usr/src/app/scratch-gui
EXPOSE 80
CMD ["npm","start"]
