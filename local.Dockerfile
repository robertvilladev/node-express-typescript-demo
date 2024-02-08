# Development Dockerfile used with docker-compose 
FROM node:current-slim

WORKDIR /app

# Copy package.json and package-lock.json files first
COPY package*.json ./

# Install global and app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

# RUN chmod +x /app/scripts/docker/local-run.sh
CMD npm run start

