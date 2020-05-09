FROM node:13-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn

EXPOSE 3002

ENTRYPOINT [ "./init.sh" ]
