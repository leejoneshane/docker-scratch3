FROM node:onbuild
MAINTAINER leejoneshane@gmail.com

EXPOSE 8073
WORKDIR /root
RUN git clone https://github.com/LLK/scratch-vm.git \
    && cd scratch-vm \
    && npm install
CMD ["npm start"]
