FROM node
MAINTAINER leejoneshane@gmail.com

WORKDIR /usr/src/app
RUN apt-get update \
    && apt-get -y install vim \
    && apt-get clean \
    && git clone https://github.com/LLK/scratch-gui.git \
    && mv scratch-gui/* . \
    && rm -rf scratch-gui \
    && npm install

EXPOSE 8601
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
