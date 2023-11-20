# Fetching the minified node image on apline linux
FROM node:18.13-slim

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
RUN npm install pm2 -g

# Starting our application
CMD pm2 start process.yml && tail -f /dev/null

# Exposing server port
EXPOSE 3000