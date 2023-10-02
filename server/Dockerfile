FROM node:18-alpine AS base-image

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001:5432
EXPOSE 443
EXPOSE 8080
# CMD npm start
CMD [ "node", "dist/server.js" ]