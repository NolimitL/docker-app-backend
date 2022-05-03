FROM node

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8080

ENV MONGODB_USERNAME=leonid
ENV MONGODB_PASSWORD=pass
ENV MONGODB_URL=database

CMD ["npm", "start"]