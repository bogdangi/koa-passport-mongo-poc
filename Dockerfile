# The instructions for the first stage
FROM node:13.1.0-alpine as builder

WORKDIR /usr/src/app

COPY bcrypt-dependencies.sh ./
RUN ./bcrypt-dependencies.sh

COPY package.json ./
COPY yarn.lock ./

ENV NODE_ENV=production

RUN yarn install --prod

# The instructions for second stage
FROM node:13.1.0-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY . .

CMD [ "yarn", "start" ]
