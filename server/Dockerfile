FROM node:12.19.0-alpine

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
