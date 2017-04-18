FROM node
MAINTAINER leejoneshane@gmail.com

WORKDIR /usr/src/app
RUN git clone https://github.com/LLK/scratch-gui.git \
    && mv scratch-gui/* . \
    && rm -rf scratch-gui \
    && npm install

EXPOSE 8601
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
