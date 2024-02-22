FROM node:20.11.1-alpine3.19

WORKDIR /app

ENV REDIS_HOST=examplehost
ENV REDIS_PORT=6379

COPY package.json ./

RUN npm install

COPY src .

EXPOSE 3000

CMD [ "node", "server.js" ]