FROM node:14
WORKDIR /app
COPY package*.json  /app/
RUN npm install
COPY . /app/
EXPOSE 3000
RUN which npm
CMD ["npm","run","dev"]