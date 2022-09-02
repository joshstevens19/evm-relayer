FROM node:lts-alpine

RUN apk add --no-cache --update git alpine-sdk python3

ENV NODE_OPTIONS=--max-old-space-size=6000

# Create app directory
WORKDIR /usr/src/app

COPY ./server/package*.json ./
COPY ./server/tsconfig.json ./
COPY ./server/tsconfig.build.json ./

RUN npm ci --only=production
RUN npm prune

RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]
