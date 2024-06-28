FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon

COPY . .

EXPOSE 3010

CMD ["npm", "start"]
