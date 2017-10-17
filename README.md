# docker-scratch3

This is a Docker image build for Scratch3 editor on node.js server.

Scratch GUI is a set of React components that comprise the interface for creating and running Scratch 3.0 projects. More detail see https://github.com/LLK/scratch-gui

To run the editor, you must mapping tcp 80 port when run the container first time, use command below:
```
docker run -p 80:80 --name scratch -d leejoneshane/docker-scratch3
```
If the dev server is running then go to http://docker_host_ip/

If you want to change the web dev server confugure, you should copy the container's VOLUME data first, command below:
```
docker cp scratch:/usr/src/app /root/scratch3
```
Then edit the /root/scratch-vm/webpack.config.js change the webpack-dev-server configuration.
The next step, you must remove old container and run a new container with -v, command below:
```
docker run --name scratch -v /root/scratch3:/usr/src/app -d leejoneshane/docker-scratch3
```
