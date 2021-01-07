FROM node:12-alpine

ENV NODE_ENV production
ENV PORT 80

RUN apk add --no-cache git \
    && git clone --depth=1 https://github.com/LLK/scratch-gui \
    && cd scratch-gui \
    && npm install && npm fund && npm audit fix \
    && BUILD_MODE=dist npm run build \
    && npm link \
    && cd / && git clone --depth=1 https://github.com/LLK/scratch-www \
    && cd scratch-www \
    && npm install && npm fund && npm audit fix \
    && npm link scratch-gui \
    && npm run build

WORKDIR /scratch-www
EXPOSE 80
CMD ["npm","start"]
