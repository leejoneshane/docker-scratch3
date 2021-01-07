FROM node:12-alpine

ENV NODE_ENV production
ENV PORT 80

RUN apk add --no-cache git \
    && git clone --depth=1 https://github.com/LLK/scratch-gui \
    && cd scratch-gui \
    && npm install --no-optional --save-dev react-intl-redux@^0.7 \
    && npm install --no-optional --save-dev react-responsive@^5.0.0 \
    && npm install --no-optional \
    && npm fund && npm audit fix \
    && npm run build

WORKDIR /scratch-gui
EXPOSE 80
CMD ["npm","start"]
