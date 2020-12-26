FROM node:12.18-alpine
WORKDIR /usr/src/app/
COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
