FROM node:12.19.0-alpine

RUN mkdir -p /app/client/src

WORKDIR /app/client/src

COPY ./client/package.json .

RUN npm install

COPY ./client .

EXPOSE 4000

CMD ["npm", "start"]
