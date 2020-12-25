FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8000
CMD ["yarn","run","start"]
