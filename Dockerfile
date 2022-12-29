FROM node:18-alpine

ARG PORT=PORT
ENV PORT=$PORT
ARG SPOTIFY_CLIENT_ID=SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
ARG SPOTIFY_CLIENT_SECRET=SPOTIFY_CLIENT_SECRET
ENV SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

WORKDIR /usr/src/app/frontend

RUN npm install 
RUN npm run build
RUN rm -rf node_modules
RUN rm -rf src

WORKDIR /usr/src/app

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

RUN npm install

EXPOSE 3080
CMD [ "node", "src/server.js" ]