FROM node:lts-alpine
RUN apk add g++ make py3-pip
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node","index.js" ]
