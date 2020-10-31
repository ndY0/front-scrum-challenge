FROM node:15.0.1-alpine3.12

WORKDIR /usr/local/src

RUN apk update && \
    apk add --no-cache \
        yarn

COPY . .

RUN yarn install

CMD ["yarn", "start"]