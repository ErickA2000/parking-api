##Stage 1
FROM node:18.17.0-alpine3.18 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

##Stage 2

FROM node:18.17.0-alpine3.18

COPY --from=build /app ./

EXPOSE $PORT

CMD [ "npm", "start" ]