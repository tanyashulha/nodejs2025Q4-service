ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
COPY package*.json .
COPY prisma ./prisma/
RUN npm ci && npm cache clean --force
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD npx prisma migrate dev && npm run start:dev
