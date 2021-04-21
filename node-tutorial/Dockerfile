FROM node:10

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

CMD [ "npm", "start" ]