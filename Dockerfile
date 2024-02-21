FROM node:20-alpine3.18

WORKDIR /Users/pat/project/node-hello/index.js

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

CMD ["npm","start"]