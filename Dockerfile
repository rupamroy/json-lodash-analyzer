FROM node:4.5.0

MAINTAINER Rupam Roy

WORKDIR /app
EXPOSE 3000
COPY /dist/bower_components /app/
COPY package.json /app
RUN npm install
CMD ["node","src/server/server.js"]

COPY /dist/src /app/

