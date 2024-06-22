##* Stage 1
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

##* Stage 2

FROM node:18.17.0-alpine3.18

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate
RUN npm install --omit=dev

EXPOSE $PORT

CMD [ "sh", "-c", "npx prisma migrate deploy && npm start" ]
