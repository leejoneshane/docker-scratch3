# docker-scratch3

This is a Docker image build for Scratch VM on node.js server.

Scratch VM is a library for representing, running, and maintaining the state of computer programs written using Scratch Blocks.
more detail see https://github.com/LLK/scratch-vm

To run the Playground, you must mapping tcp 8073 port when run the container first time, use command below:

docker run -p 80:8073 --name scratch -d leejoneshane/docker-scratch3

If the dev server is running then go to http://docker_host_ip/playground/index.html

you will be directed to the playground, which demonstrates various tools and internal state.

If you want to change the webserver confugure, you should copy the container's VOLUME data first, command below:

docker cp scratch:/usr/src/app /root/scratch-vm

Then edit the /root/scratch-vm/webserver.js change the port number or something else.
The next step, you must remove old container and run a new container with -v, command below:

docker run --name scratch -v /root/scratch-vm:/usr/src/app -d leejoneshane/docker-scratch3
