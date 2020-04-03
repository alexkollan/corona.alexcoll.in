FROM node:latest

WORKDIR /usr/src/corona.alexcoll.in

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]