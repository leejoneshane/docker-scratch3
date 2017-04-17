FROM node:boron
MAINTAINER leejoneshane@gmail.com

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN git clone https://github.com/LLK/scratch-vm.git \
    && cd scratch-vm \
    && mv * ../ \
    && cd .. \
    && rm -rf scratch-vm \
    && npm install
EXPOSE 8073
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
