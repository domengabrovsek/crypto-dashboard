# dockerfile for playground-client

# https://hub.docker.com/_/node
FROM node

# clone source && install dependencies
RUN git clone https://github.com/domengabrovsek/playground.git app && npm install --prefix "app/client"

# run app
CMD npm run serve --prefix "app/client"