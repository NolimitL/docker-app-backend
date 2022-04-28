FROM node

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=leonid
ENV MONGODB_PASSWORD=pass
ENV MONGODB_URL=localhost

CMD ["npm ", "start"]