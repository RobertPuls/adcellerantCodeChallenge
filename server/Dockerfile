FROM node:12.19.0-alpine

RUN mkdir -p /app/server/src

WORKDIR /app/server/src

COPY ./server/package.json .

RUN npm install

COPY ./server .

EXPOSE 4000

CMD ["npm", "start"]
