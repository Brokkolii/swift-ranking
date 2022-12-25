FROM node:18

# Create app directory
WORKDIR /usr/src/app
CMD [ "MKDIR" "public" ]

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY src .
COPY frontend/dist .

CMD [ "ls" ]

EXPOSE 3080
CMD [ "node", "server.js" ]