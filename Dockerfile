FROM node:4.5.0

MAINTAINER Rupam Roy

WORKDIR /app
EXPOSE 3000
COPY bower.json /app
COPY package.json /app
RUN npm install bower -g && \
    npm install --production && \
    bower install --allow-root
CMD ["node","src/server/server.js"]

COPY /dist/src /app/src

