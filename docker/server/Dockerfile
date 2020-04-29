# dockerfile for playground-server

# https://hub.docker.com/_/node
FROM node:12.16.3

# clone source code
RUN git clone https://github.com/domengabrovsek/playground.git app

# install dependencies
RUN npm install --prefix "app/server"

# run app
CMD node ./app/server/index.js