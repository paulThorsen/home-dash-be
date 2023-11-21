# Fetching the minified node image on apline linux
FROM --platform=linux/amd64 node:18.13-slim

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD npm start

# Exposing server port
EXPOSE 3000