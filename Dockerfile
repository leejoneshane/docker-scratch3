FROM node:boron
MAINTAINER leejoneshane@gmail.com

EXPOSE 8073
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN git clone https://github.com/LLK/scratch-vm.git \
    && cd scratch-vm \
    && npm install

CMD ["npm","start"]
