FROM node:latest
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
