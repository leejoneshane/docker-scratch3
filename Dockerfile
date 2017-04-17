FROM node
MAINTAINER leejoneshane@gmail.com

EXPOSE 8073
WORKDIR /root
RUN git clone https://github.com/LLK/scratch-vm.git \
    && cd scratch-vm \
    && npm install \
    && npm start
CMD ["node"]
