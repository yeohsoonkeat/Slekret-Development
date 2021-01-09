FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent  
RUN yarn add bcrypt && mv node_modules ../
COPY . .
EXPOSE 8000

CMD ["yarn","run","start"]
