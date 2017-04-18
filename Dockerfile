FROM node:boron
MAINTAINER leejoneshane@gmail.com

WORKDIR /usr/src/app
RUN npm install https://github.com/LLK/scratch-vm.git#develop

EXPOSE 8601
VOLUME ["/usr/src/app"]
CMD ["npm","start"]
