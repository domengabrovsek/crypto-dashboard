# dockerfile for playground-server

# https://hub.docker.com/_/node
FROM node

# install dependencies
RUN apk add --update git
RUN git clone https://github.com/domengabrovsek/playground.git app
RUN cd app/server && npm install

# run app
CMD node ./app/server/index.js