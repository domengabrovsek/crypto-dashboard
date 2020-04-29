# dockerfile for playground-client

# https://hub.docker.com/_/node
FROM node:12.16.3

# clone source code
RUN git clone https://github.com/domengabrovsek/playground.git app

# install dependencies
RUN npm install --prefix "app/client"

# run app
CMD npm run serve --prefix "app/client"