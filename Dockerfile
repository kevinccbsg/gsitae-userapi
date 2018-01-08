FROM node:carbon

RUN mkdir -p /user/src/app

# Create app directory
WORKDIR /user/src/app

copy package.json package-lock.json ./

RUN npm install

# bundle app source
COPY . .

EXPOSE 3000

cmd ["npm", "start"]
