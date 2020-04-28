# dockerfile for playground-server

# https://hub.docker.com/_/node
FROM node

# clone source && install dependencies
RUN git clone https://github.com/domengabrovsek/playground.git app && cd app/server && npm install

# run app
CMD node ./app/server/index.js