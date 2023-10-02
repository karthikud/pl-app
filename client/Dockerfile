FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# Bundle app source
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]