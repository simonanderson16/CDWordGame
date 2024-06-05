#  Dockerfile for Node Express Backend
FROM node:22.1-alpine

# Create App Directory
COPY . /usr/src/app

# Working directory be app
WORKDIR /usr/src/app

# Installing dependencies.
RUN npm i -g nodemon
RUN npm i

EXPOSE 8888

CMD ["npm","start"]